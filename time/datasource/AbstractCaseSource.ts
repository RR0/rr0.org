import { RR0SsgContext } from "../../../RR0SsgContext"
import { CaseSource } from "./CaseSource"

export abstract class AbstractCaseSource<S> implements CaseSource<S> {
  protected summaries: S[]

  async getSummaries(context: RR0SsgContext): Promise<S[]> {
    if (!this.summaries) {
      this.summaries = await this.readSummaries(context)
    }
    return this.summaries
  }

  async fetch(context: RR0SsgContext): Promise<S[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const summaries = await this.getSummaries(context)
    return summaries.filter(c => {
      const sightingTime = c.dateTime
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    })
  }

  protected abstract readSummaries(context: RR0SsgContext): Promise<S[]>
}
