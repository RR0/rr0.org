import { FileUtil, SsgContext, SsgStep } from "ssg-api"
import { SearchIndex, SearchVisitor } from "./SearchVisitor.js"
import fs from "fs"

/**
 * Saves the index file collected by the SearchCommand.
 */
export class SearchIndexStep implements SsgStep {

  protected encoding: BufferEncoding = "utf8"

  /**
   * @param fileName The index file path
   * @param searchCommand The command that collected the pages info.
   */
  constructor(protected fileName: string, protected searchCommand: SearchVisitor) {
  }

  /**
   * Write the search index file.
   *
   * @param context
   */
  execute(context: SsgContext): Promise<any> {
    const newIndex = this.searchCommand.index
    let existingIndex: SearchIndex
    try {
      existingIndex = JSON.parse(fs.readFileSync(this.fileName, {encoding: this.encoding}))
      const newPages = newIndex.pages
      const existingPages = existingIndex.pages
      for (let newPage of newPages) {
        const alreadyIndexedPage = existingPages.find(existingPage => existingPage.url === newPage.url)
        if (alreadyIndexedPage) {
          Object.assign(alreadyIndexedPage, newPage)
        } else {
          existingPages.push(newPage)
        }
      }
      existingPages.sort(
        (pageInfo1, pageInfo2) => pageInfo1.title > pageInfo2.title ? 1 : pageInfo1.title < pageInfo2.title ? -1 : 0)
    } catch (e) {
      if (e.errno !== -2) {
        throw e
      }
      context.warn("Could not find", this.fileName, "Will create it")
      existingIndex = newIndex
    }
    context.log("Saving search index of", existingIndex.pages.length, "pages at", this.fileName)
    const indexJson = JSON.stringify(existingIndex)
    return FileUtil.writeFile(this.fileName, indexJson, "utf-8")
  }
}
