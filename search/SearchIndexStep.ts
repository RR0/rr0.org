import {FileUtil, SsgContext, SsgStep} from "ssg-api"
import {SearchCommand} from "./SearchCommand"

/**
 * Saves the index file collected by the SearchCommand.
 */
export class SearchIndexStep implements SsgStep {

  constructor(protected fileName: string, protected searchCommand: SearchCommand) {
  }

  execute(context: SsgContext): Promise<any> {
    context.log("Saving index at", this.fileName)
    return FileUtil.writeFile(this.fileName, JSON.stringify(this.searchCommand.index), "utf-8")
  }
}
