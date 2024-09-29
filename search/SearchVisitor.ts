import { HtmlFileContents } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import fs from "fs"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { FileVisitor } from "../RR0ContentStep"

export type PageInfo = {
  title: string
  url: string
  time: string
  html?: string
}

type WordCount = {
  pageIndex: number;
  count: number;
}

export type SearchIndex = {
  pages: PageInfo[],
  words: {
    [key: string]: WordCount[]
  }
}

export type SearchCommandConfig = {
  notIndexedUrls: string[]
  indexWords: boolean
  indexContent?: string
}

/**
 * Builds an index of pages.
 */
export class SearchVisitor implements FileVisitor {

  readonly index: SearchIndex = {
    pages: [],
    words: {}
  }

  protected readonly contentStream: fs.WriteStream | undefined

  constructor(protected config: SearchCommandConfig, protected timeTextBuilder: TimeTextBuilder) {
    const indexContent = this.config.indexContent
    if (indexContent) {
      this.contentStream = fs.createWriteStream(indexContent)
    }
  }

  async contentStepEnd() {
    const contentStream = this.contentStream
    if (contentStream) {
      contentStream.write("\n]")
      contentStream.end()
    }
  }

  async visit(context: HtmlRR0SsgContext): Promise<void> {
    const file = context.file
    const title = file.title
    const outDir = "out/"
    const url = file.name.startsWith(outDir) ? file.name.substring(outDir.length) : file.name
    if (title && !this.config.notIndexedUrls.includes(url)) {
      const indexedPages = this.index.pages
      const titleIndexed = indexedPages.find(page => page.title === title && page.url !== url)
      if (titleIndexed) {
        this.handleAlreadyIndexed(title, url, titleIndexed)
      }
      const indexContext = context.clone()
      const time = this.timeTextBuilder.build(indexContext, true,
        {year: "numeric", month: "short", day: "numeric"}).toLowerCase()
      indexedPages.push({title, url, time})
    }
    if (this.config.indexWords) {
      this.indexWords(context, file)
    }
    if (this.config.indexContent) {
      this.indexContent(context, file)
    }
  }

  protected handleAlreadyIndexed(title: string, url: string, titleIndexed: PageInfo) {
    throw new Error(`Title "${title}" with URL ${url} is already indexed with URL ${titleIndexed.url}`)
  }

  protected getContents(doc: Document) {
    const div = doc.createElement("div")
    div.append(doc.body)
    this.removeTags(div, "script")
    this.removeTags(div, "nav")
    this.removeTags(div, "footer")
    return div.textContent
  }

  protected indexContent(context: HtmlRR0SsgContext, outputFile: HtmlFileContents) {
    const contents = this.getContents(outputFile.document)
    const contentsRecord: PageInfo = {
      title: outputFile.title,
      url: context.file.name,
      time: context.time.toString(),
      html: contents
    }
    const prefix = this.contentStream.bytesWritten === 0 ? "[\n" : ",\n"
    const str = prefix + JSON.stringify(contentsRecord)
    this.contentStream.write(str)
  }

  protected indexWords(context: HtmlRR0SsgContext, outputFile: HtmlFileContents) {
    const pageIndex = this.index.pages.length
    const nonSignificant = context.messages.nonSignificantWords
    const contents = this.getContents(outputFile.document)
    const pageText = contents.toLowerCase()
    const pageWords = pageText.split(/[ \t,.…'’\-" :!?;()\[\]\n]/g)
      .filter(w => w.length > 1)
      .filter(w => !nonSignificant.includes(w))
      .filter(w => {
        const num = parseInt(w, 10)
        return Number.isNaN(num) || num > 1000
      })
    const pageWordsCount = new Map<string, number>()
    for (const pageWord of pageWords) {
      let pageWordCount = pageWordsCount.get(pageWord)
      if (!pageWordCount) {
        pageWordCount = 0
      }
      pageWordsCount.set(pageWord, pageWordCount + 1)
    }
    for (const word of new Set(pageWords)) {
      let existingWordCounts = this.index.words[word]
      if (!existingWordCounts) {
        existingWordCounts = this.index.words[word] = []
      }
      const pageWordCount = pageWordsCount.get(word)
      existingWordCounts.push({pageIndex, count: pageWordCount})
    }
  }

  protected removeTags(div: HTMLDivElement, selector: string) {
    const found = div.querySelectorAll(selector)
    let i = found.length
    while (i--) {
      found[i].parentNode.removeChild(found[i])
    }
  }
}
