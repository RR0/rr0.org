import {FileUtil, HtmlSsgContext, HtmlSsgFile, ReplaceCommand} from "ssg-api"
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
  protected index: SearchIndex = {
    pages: [],
    words: {}
  }

  async execute(context: HtmlRR0SsgContext): Promise<HtmlSsgFile> {
    const outputFile = context.outputFile
    const pageIndex = this.index.pages.length
    this.index.pages.push({
      title: outputFile.title,
      url: outputFile.name
    })
    const nonSignificant = context.messages.nonSignificantWords
    const contents = this.getContents(outputFile.document)
    const pageText = contents.toLowerCase()
    const pageWords = pageText.split(/[ ,.'":!?;()\[\]\n]/g)
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
    return outputFile
  }

  async save(fileName: string) {
    FileUtil.writeFile(fileName, JSON.stringify(this.index), "utf-8")
  }

  protected getContents(doc: Document) {
    var div = doc.createElement("div")
    div.append(doc.body)
    this.removeTags(div, "script")
    this.removeTags(div, "nav")
    this.removeTags(div, "footer")
    return div.textContent
  }

  private removeTags(div: HTMLDivElement, selector: string) {
    const found = div.querySelectorAll(selector)
    let i = found.length
    while (i--) {
      found[i].parentNode.removeChild(found[i])
    }
  }
}
