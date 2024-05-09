import { SsgFile } from "ssg-api"
import { RR0FileUtil } from "./util/file/RR0FileUtil"
import { RR0SsgContext } from "./RR0SsgContext"
import { RR0Data } from "./RR0Data"
import { sync as glob } from "glob-promise"

export class DataService {

  protected readonly pathToData = new Map<string, RR0Data[]>()

  constructor(readonly dirs: string[], protected fileNames: string[]) {
  }

  static async create<T>(name: string): Promise<DataService> {
    const fileName = name + ".json"
    const dirs = RR0FileUtil.findDirectoriesContaining(fileName)
    return new DataService(dirs, [fileName])
  }

  async get<T extends RR0Data = RR0Data>(context: RR0SsgContext, dirName: string, types: string[],
                                         fileNames: string[] = this.fileNames): Promise<T[]> {
    const key = dirName + "$" + fileNames.join("$")
    let dataList = this.pathToData.get(key)
    if (dataList === undefined) {
      dataList = await this.read(context, dirName, fileNames)
      this.pathToData.set(key, dataList)
    }
    return dataList.filter(data => types.includes(data.type)) as T[]
  }

  protected async read(context: RR0SsgContext, dirName: string,
                       fileNames: string[] = this.fileNames): Promise<RR0Data[]> {
    const dataList: RR0Data[] = []
    const p = dirName + "/*(" + fileNames.join("|") + ")"
    const files = glob(p)
    for (const file of files) {
      try {
        const jsonFileInfo = SsgFile.read(context, file)
        const data: RR0Data = {dirName, time: "", title: ""}
        Object.assign(data, JSON.parse(jsonFileInfo.contents))
        dataList.push(data)
      } catch (e) {
        console.warn(`${dirName} has no ${fileNames} description`)
      }
    }
    return dataList
  }
}
