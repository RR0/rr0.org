import { RR0SsgContext } from "../../../RR0SsgContext.js"
import { Datasource } from "../Datasource.js"
import { FileContents } from "ssg-api"
import { UfoSearchDatasource } from "./UfoSearchDatasource.js"
import { JsonMapper } from "../JsonMapper.js"
import { UfoSearchCase } from "./UfoSearchCase.js"

class FileMapper extends JsonMapper<UfoSearchCase> {
  parse(context: RR0SsgContext, data: string): UfoSearchCase[] {
    const allData = super.parse(context, data)
    return allData["Majestic Timeline"] as UfoSearchCase[]
  }
}

export class UfoSearchFileDatasource extends UfoSearchDatasource implements Datasource<UfoSearchCase> {

  readonly fileMapper = new FileMapper()

  constructor(readonly fileName: string) {
    super()
  }

  protected async readCases(context: RR0SsgContext): Promise<UfoSearchCase[]> {
    const file = FileContents.read(this.fileName, "utf-8")
    return this.fileMapper.parse(context, file.contents)
  }
}
