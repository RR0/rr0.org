import { SsgFile } from "ssg-api"
import { RR0FileUtil } from "./util/file/RR0FileUtil"
import { RR0SsgContext } from "./RR0SsgContext"
import path from "path"
import { Rr0Data } from "./Rr0Data"

export class DataService<T extends Rr0Data> {

  protected readonly pathToData = new Map<string, T>()

  constructor(readonly dirs: string[], protected fileName: string) {
  }

  static async create<T>(name: string): Promise<DataService<T>> {
    const fileName = name + ".json"
    const dirs = RR0FileUtil.findDirectoriesContaining(fileName)
    return new DataService<T>(dirs, fileName)
  }

  read(context: RR0SsgContext, dirName: string): T {
    let data = this.pathToData.get(dirName)
    if (data === undefined) {
      try {
        data = {dirName, time: "", title: ""}
        const p = path.join(dirName, this.fileName)
        const jsonFileInfo = SsgFile.read(context, p)
        Object.assign(data, JSON.parse(jsonFileInfo.contents))
        this.pathToData.set(dirName, data)
      } catch (e) {
        console.warn(`${dirName} has no ${this.fileName} description`)
        data = null
      }
    }
    return data
  }
}
