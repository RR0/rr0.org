import { RR0FileUtil } from "../../../../../util/file/RR0FileUtil"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { SsgFile } from "ssg-api"
import { Case } from "./Case"

export class CaseService {

  protected readonly dirToCase = new Map<string, Case>()

  constructor(readonly dirs: string[]) {
  }

  static async create() {
    const dirs = RR0FileUtil.findDirectoriesContaining("case.json")
    return new CaseService(dirs)
  }

  read(context: RR0SsgContext, dirName: string): Case {
    let dirCase = this.dirToCase.get(dirName)
    if (dirCase === undefined) {
      try {
        dirCase = {dirName, time: "", title: ""}
        const jsonFileInfo = SsgFile.read(context, `${dirName}/case.json`)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(`${dirName} has no case.json description`)
        dirCase = null
      }
      this.dirToCase.set(dirName, dirCase)
    }
    return dirCase
  }
}
