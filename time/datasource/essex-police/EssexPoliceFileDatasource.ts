import { RR0SsgContext } from "../../../RR0SsgContext"
import { CaseSource } from "../CaseSource"
import { SsgFile } from "ssg-api"
import { EssexPoliceDatasource } from "./EssexPoliceDatasource"
import { JsonMapper } from "../JsonMapper"
import { EssexPoliceCaseSummary } from "./EssexPoliceCaseSummary"

export class EssexPoliceFileDatasource extends EssexPoliceDatasource implements CaseSource<EssexPoliceCaseSummary> {

  readonly fileMapper = new class extends JsonMapper<EssexPoliceCaseSummary> {
    parse(context: RR0SsgContext, data: string): EssexPoliceCaseSummary[] {
      const allData = super.parse(context, data)
      return allData["Majestic Timeline"] as EssexPoliceCaseSummary[]
    }
  }()

  constructor(readonly fileName: string) {
    super()
  }

  protected async readCases(context: RR0SsgContext): Promise<EssexPoliceCaseSummary[]> {
    const file = SsgFile.read(context, this.fileName, "utf-8")
    return this.fileMapper.parse(context, file.contents)
  }
}
