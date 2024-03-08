import { RR0SsgContext } from "../../../RR0SsgContext"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { CaseSource } from "../CaseSource"
import { CsvMapper } from "../CsvMapper"
import { GeipanCase } from "./GeipanCase"
import { GeipanCaseSummaryMapper } from "./GeipanCaseSummaryMapper"
import { geipanHttpDatasource } from "./GeipanRR0Mapping"
import { SsgFile } from "ssg-api"

export class GeipanFileDatasource implements CaseSource<GeipanCaseSummary> {
  readonly author = "GEIPAN"
  readonly copyright = "Catalogue de cas"
  private summaries: GeipanCaseSummary[]

  constructor(readonly fileName: string) {
  }

  getSummaries(context: RR0SsgContext): GeipanCaseSummary[] {
    if (!this.summaries) {
      this.summaries = this.readSummaries(context)
    }
    return this.summaries
  }

  async getAll(context: RR0SsgContext): Promise<GeipanCaseSummary[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    return this.getSummaries(context).filter(c => {
      const sightingTime = c.dateTime
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    })
  }

  protected readSummaries(context: RR0SsgContext): GeipanCaseSummary[] {
    const exportMapper = new CsvMapper<GeipanCase>(";")
    const file = SsgFile.read(context, this.fileName, "latin1")
    const csvMapper = new GeipanCaseSummaryMapper(geipanHttpDatasource.baseUrl, geipanHttpDatasource.searchPath,
      geipanHttpDatasource.author)
    return exportMapper.read(context, file.contents).map(csvCase => csvMapper.map(context, csvCase, file.lastModified))
  }
}
