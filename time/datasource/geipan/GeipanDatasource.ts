import { CaseSource } from "../CaseSource"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class GeipanDatasource implements CaseSource<GeipanCaseSummary> {
  readonly authors = ["GEIPAN"]
  readonly copyright = "Catalogue de cas"

  getSummaries(context: RR0SsgContext): GeipanCaseSummary[] {
    if (!this.summaries) {
      this.summaries = this.readSummaries(context)
    }
    return this.summaries
  }

  async fetch(context: RR0SsgContext): Promise<GeipanCaseSummary[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    return this.getSummaries(context).filter(c => {
      const sightingTime = c.dateTime
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    })
  }

  protected abstract readSummaries(context: RR0SsgContext): GeipanCaseSummary[]
}
