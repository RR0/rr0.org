import {HtmlSsgContext, HtmlSsgFile, ReplaceCommand} from "ssg-api"
import {HtmlRR0SsgContext} from "../RR0SsgContext"

type PageInfo = {
  title: string,
  url: string
}

type WordCount = {
  pageIndex: number;
  count: number;
}
type SearchIndex = {
  pages: PageInfo[],
  words: {
    [key: string]: WordCount[]
  }
}

export class SearchCommand implements ReplaceCommand<HtmlSsgContext> {
  readonly index: SearchIndex = {
    pages: [],
    words: {}
  }

  constructor(protected notIndexedUrls: string[]) {
  }

  async execute(context: HtmlRR0SsgContext): Promise<HtmlSsgFile> {
    const outputFile = context.outputFile
    const title = outputFile.title
    const url = outputFile.name
    if (title && !this.notIndexedUrls.includes(url)) {
      const indexedPages = this.index.pages
      const titleIndexed = indexedPages.find(page => page.title === title && page.url !== url)
      if (titleIndexed) {
        context.warn(`Title "${title}" with URL ${url} is already indexed with URL ${titleIndexed.url}`)
      }
      indexedPages.push({title, url})
    }
    // this.indexWords(context, outputFile)
    return outputFile
  }

  protected getContents(doc: Document) {
    var div = doc.createElement("div")
    div.append(doc.body)
    this.removeTags(div, "script")
    this.removeTags(div, "nav")
    this.removeTags(div, "footer")
    return div.textContent
  }

  private indexWords(context: HtmlRR0SsgContext, outputFile: HtmlSsgFile) {
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

  private removeTags(div: HTMLDivElement, selector: string) {
    const found = div.querySelectorAll(selector)
    let i = found.length
    while (i--) {
      found[i].parentNode.removeChild(found[i])
    }
  }
}
