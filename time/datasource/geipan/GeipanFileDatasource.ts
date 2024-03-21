import { RR0SsgContext } from "../../../RR0SsgContext"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { CaseSource } from "../CaseSource"
import { CsvMapper } from "../CsvMapper"
import { GeipanCase } from "./GeipanCase"
import { GeipanCaseSummaryMapper } from "./GeipanCaseSummaryMapper"
import { geipanHttpDatasource } from "./GeipanRR0Mapping"
import { SsgFile } from "ssg-api"
import { GeipanDatasource } from "./GeipanDatasource"

export class GeipanFileDatasource extends GeipanDatasource implements CaseSource<GeipanCaseSummary> {
  private summaries: GeipanCaseSummary[]

  constructor(readonly fileName: string) {
    super()
  }

  protected readSummaries(context: RR0SsgContext): GeipanCaseSummary[] {
    const exportMapper = new CsvMapper<GeipanCase>(";")
    const file = SsgFile.read(context, this.fileName, "latin1")
    const csvMapper = new GeipanCaseSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    return exportMapper.read(context, file.contents).map(csvCase => csvMapper.map(context, csvCase, file.lastModified))
  }
}
