import { SsgFile } from "ssg-api"
import { RR0FileUtil } from "./util/file/RR0FileUtil"
import { RR0SsgContext } from "./RR0SsgContext"

export class DataService<T> {

  protected readonly dirToData = new Map<string, T>()

  constructor(readonly dirs: string[], protected fileName: string) {
  }

  static async create<T>(fileName: string): Promise<DataService<T>> {
    const dirs = RR0FileUtil.findDirectoriesContaining(fileName)
    return new DataService<T>(dirs, fileName)
  }

  read(context: RR0SsgContext, dirName: string): T {
    let dirCase = this.dirToData.get(dirName)
    if (dirCase === undefined) {
      try {
        dirCase = {dirName, time: "", title: ""}
        const jsonFileInfo = SsgFile.read(context, `${dirName}/` + this.fileName)
        Object.assign(dirCase, JSON.parse(jsonFileInfo.contents))
      } catch (e) {
        console.warn(`${dirName} has no case.json description`)
        dirCase = null
      }
      this.dirToData.set(dirName, dirCase)
    }
    return dirCase
  }
}
