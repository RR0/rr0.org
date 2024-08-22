import { sync as glob } from "glob-promise"
import { FileContents } from "ssg-api"
import { RR0Data } from "./RR0Data"
import { TypedDataFactory } from "./TypedDataFactory"

/**
 * Fetch RR0 data from JSON files.
 */
export class AllDataService {

  readonly pathToData = new Map<string, RR0Data[]>()

  /**
   *
   * @param factories The factories to instantiate different RR0Data types.
   */
  constructor(readonly factories: TypedDataFactory<RR0Data>[]) {
  }

  async getFromDir<T extends RR0Data = RR0Data>(
    dirName: string, types: string[],
    fileNames: string[] = this.factories.reduce((allFileNames, factory) => factory.fileNames.concat(allFileNames), [])
  ): Promise<T[]> {
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
          try {
            data = factory.create(dataFile)
          } catch (e) {
            console.warn("Could not create a", factory.type, "from", dataFile, "because of", e)
          }
        }
        if (data) {
          dataList.push(data)
        } else {
          throw new Error("No factory to handle " + dataFile)
        }
      } catch (e) {
        console.warn(dirName, "has no", fileNames, "description")
      }
    }
    return dataList
  }
}
