import { RR0SsgContext } from "../../../RR0SsgContext"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { Datasource } from "../Datasource"
import { CsvMapper } from "../CsvMapper"
import { GeipanCase } from "./GeipanCase"
import { GeipanCaseSummaryMapper } from "./GeipanCaseSummaryMapper"
import { geipanHttpDatasource } from "./GeipanRR0Mapping"
import { FileContents } from "ssg-api"
import { GeipanDatasource } from "./GeipanDatasource"

export class GeipanFileDatasource extends GeipanDatasource implements Datasource<GeipanCaseSummary> {

  constructor(readonly fileName: string) {
    super()
  }

  protected async readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]> {
    const fileMapper = new CsvMapper<GeipanCase>(";")
    const file = FileContents.read(context, this.fileName, "latin1")
    const csvMapper = new GeipanCaseSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.authors)
    return fileMapper.parse(context, file.contents).map(csvCase => csvMapper.map(context, csvCase, file.lastModified))
  }
}
