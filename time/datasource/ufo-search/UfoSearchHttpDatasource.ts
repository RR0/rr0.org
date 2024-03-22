import { RR0SsgContext } from "../../../RR0SsgContext"
import { CaseSource } from "../CaseSource"
import { UfoSearchCase, UfoSearchDatasource } from "./UfoSearchDatasource"

export class UfoSearchHttpDatasource extends UfoSearchDatasource implements CaseSource<UfoSearchCase> {

  constructor(readonly baseUrl: string, readonly searchPath: string) {
    super()
  }

  protected readSummaries(context: RR0SsgContext): UfoSearchCase[] {
    throw new Error("Not implemented")
  }
}
