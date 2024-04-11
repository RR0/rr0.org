import { FileUtil, SsgContext, SsgStep } from "ssg-api"
import { SearchCommand } from "./SearchCommand"

/**
 * Saves the index file collected by the SearchCommand.
 */
export class SearchIndexStep implements SsgStep {

  constructor(protected fileName: string, protected searchCommand: SearchCommand) {
  }

  execute(context: SsgContext): Promise<any> {
    context.log("Saving index at", this.fileName)
    const index = this.searchCommand.index
    index.pages.sort(
      (pageInfo1, pageInfo2) => pageInfo1.title > pageInfo2.title ? 1 : pageInfo1.title < pageInfo2.title ? -1 : 0)
    const indexJson = JSON.stringify(index)
    return FileUtil.writeFile(this.fileName, indexJson, "utf-8")
  }
}
