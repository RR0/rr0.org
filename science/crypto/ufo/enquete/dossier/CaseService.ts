import { RR0FileUtil } from "../../../../../util/file/RR0FileUtil"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { SsgFile } from "ssg-api"

export class CaseService {

  protected readonly dirToCase = new Map()

  constructor(readonly dirs: string[]) {
  }

  static async create() {
    const dirs = RR0FileUtil.findDirectoriesContaining("case.json")
    return new CaseService(dirs)
  }

  read(context: RR0SsgContext, dirName: string) {
    let dirCase = this.dirToCase.get(dirName)
    if (!dirCase) {
      dirCase = {dirName, time: "", title: ""}
      try {
        const jsonFileInfo = SsgFile.read(context, `${dirName}/case.json`)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
        this.dirToCase.set(dirName, dirCase)
      } catch (e) {
        context.warn(`${dirName} has no case.json description`)
        // No json, just guess title.
      }
    }
    return dirCase
  }
}
