import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { Datasource } from "../Datasource"
import { CsvMapper } from "../CsvMapper"
import { FileDatasource } from "../FileDatasource"
import { CsvFileSource } from "../CsvFileSource"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"
import { rr0HttpDatasource } from "./RR0Mapping"
import { RR0Datasource } from "./RR0Datasource"

export class RR0FileDatasource extends RR0Datasource implements Datasource<RR0CaseSummary>, FileDatasource<RR0CaseSummary> {

  protected readonly file = new CsvFileSource()

  constructor(protected encoding: BufferEncoding = "utf-8") {
    super()
  }

  save(context: HtmlRR0SsgContext, fetched: any[], fetchTime: Date): void {
    return this.file.write(context, fetched, fetchTime, this)
  }

  protected async readCases(context: HtmlRR0SsgContext): Promise<RR0CaseSummary[]> {
    const fileMapper = new CsvMapper<RR0CaseSummary>()
    const file = await this.file.read(context, this)
    const csvMapper = new RR0CaseSummaryMapper(rr0HttpDatasource.baseUrl, rr0HttpDatasource.searchPath,
      rr0HttpDatasource.authors)
    return fileMapper.parse(file.contents).map(csvCase => csvMapper.map(context, csvCase, file.lastModified))
  }
}
