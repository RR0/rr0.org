import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { GeipanCaseToSummaryMapper } from "./GeipanCaseToSummaryMapper.js"
import { geipanHttpDatasource } from "./GeipanRR0Mapping.js"
import { GeipanDatasource } from "./GeipanDatasource.js"
import { GeipanSummaryToCaseMapper } from "./GeipanSummaryToCaseMapper.js"
import { GeipanCase } from "./GeipanCase.js"
import { Datasource } from "../../../../../time/datasource/Datasource.js"
import { FileDatasource } from "../../../../../time/datasource/FileDatasource.js"
import { CsvFileSource } from "../../../../../time/datasource/CsvFileSource.js"
import { HtmlRR0SsgContext } from "../../../../../RR0SsgContext.js"

export class GeipanFileDatasource extends GeipanDatasource implements Datasource<GeipanCaseSummary>, FileDatasource<GeipanCaseSummary> {

  protected readonly file = new CsvFileSource<GeipanCase>("latin1", ";")

  protected writeMapper = new GeipanSummaryToCaseMapper(geipanHttpDatasource.baseUrl,
    geipanHttpDatasource.searchPath,
    geipanHttpDatasource.authors)

  constructor(readonly defaultFileName: string, protected encoding: BufferEncoding) {
    super()
  }

  save(context: HtmlRR0SsgContext, fetched: GeipanCaseSummary[], fetchTime: Date): void {
    const nativeCases = fetched.map(summary => this.writeMapper.map(context, summary, fetchTime))
    return this.file.write(context, nativeCases, fetchTime, this)
  }

  protected async readCases(context: HtmlRR0SsgContext): Promise<GeipanCaseSummary[]> {
    const file = await this.file.read(context, this)
    const csvMapper = new GeipanCaseToSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    return this.file.mapper.parse(file.contents).map(csvCase => csvMapper.map(context, csvCase, file.lastModified))
  }
}
