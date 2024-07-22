import { FileContents } from "ssg-api"
import { RR0Data } from "./RR0Data"
import { sync as glob } from "glob-promise"
import path from "path"

/**
 * Instantiates RR0Data from (JSON) file contents.
 */
export interface RR0DataFactory<T extends RR0Data> {

  /**
   * The data type ("case", "people", "org", etc.)
   */
  readonly type: string

  /**
   * The supported file names ("case.json", "index.json", etc.).
   */
  readonly fileNames: string[]

  /**
   * Instantiate data from a file.
   *
   * @param file The file to read
   * @return the RR0Data subtype (People, RR0Case, etc.) instance,
   * or undefined if the file name/contents are not supported by this factory.
   */
  create(file: FileContents): T | undefined
}

/**
 * A RR0Data factory which can read either <someType>.json files of index.json with a "type": "<someType>" property.
 */
export class DefaultDataFactory<T extends RR0Data> implements RR0DataFactory<T> {

  constructor(readonly type: string, readonly fileNames: string[] = [type]) {
  }

  create(file: FileContents): T | undefined {
    const data = JSON.parse(file.contents)
    const basename = path.basename(file.name)
    let t: T | undefined
    if (data.type === this.type || this.fileNames.reduce(
      (hasIt: boolean, fileName) => basename.startsWith(fileName) ? true : hasIt,
      false)) {
      t = Object.assign({dirName: path.dirname(file.name), title: "", time: ""}, data)
    }
    return t
  }
}

/**
 * Fetch RR0 data from JSON files.
 */
export class DataService {

  readonly pathToData = new Map<string, RR0Data[]>()

  /**
   *
   * @param factories The factories to instantiate different RR0Data types.
   */
  constructor(readonly factories: RR0DataFactory<RR0Data>[]) {
  }

  async get<T extends RR0Data = RR0Data>(dirName: string, types: string[], fileNames: string[] = this.factories.reduce(
    (allFileNames,
     factory) => factory.fileNames.concat(
      allFileNames), [])): Promise<T[]> {
    const key = dirName + "$" + fileNames.join("$")
    let dataList = this.pathToData.get(key)
    if (dataList === undefined) {
      dataList = await this.read(dirName, fileNames)
      this.pathToData.set(key, dataList)
    }
    return dataList.filter(data => types.includes(data.type)) as T[]
  }

  protected async read(dirName: string, fileNames: string[]): Promise<RR0Data[]> {
    const dataList: RR0Data[] = []
    const p = dirName + "/*(" + fileNames.join("|") + ")"
    const files = glob(p)
    for (const file of files) {
      try {
        const dataFile = FileContents.read(file, "utf-8")
        let data: RR0Data
        for (let i = 0; !data && i < this.factories.length; i++) {
          const factory = this.factories[i]
          data = factory.create(dataFile)
        }
        if (data) {
          dataList.push(data)
        } else {
          throw new Error("No factory to handle " + dataFile)
        }
      } catch (e) {
        console.warn(`${dirName} has no ${fileNames} description`)
      }
    }
    return dataList
  }
}
