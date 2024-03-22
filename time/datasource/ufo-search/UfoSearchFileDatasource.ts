import { RR0SsgContext } from "../../../RR0SsgContext"
import { CaseSource } from "../CaseSource"
import { SsgFile } from "ssg-api"
import { UfoSearchCase, UfoSearchDatasource } from "./UfoSearchDatasource"
import { JsonMapper } from "../JsonMapper"

export class UfoSearchFileDatasource extends UfoSearchDatasource implements CaseSource<UfoSearchCase> {

  readonly fileMapper = new class extends JsonMapper<UfoSearchCase> {
    parse(context: RR0SsgContext, data: string): S[] {
      const allData = super.parse(context, data)
      return allData["Majestic Timeline"] as UfoSearchCase[]
    }
  }()

  constructor(readonly fileName: string) {
    super()
  }

  protected readSummaries(context: RR0SsgContext): UfoSearchCase[] {
    const file = SsgFile.read(context, this.fileName, "utf-8")
    return this.fileMapper.parse(context, file.contents)
  }
}
