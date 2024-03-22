import { RR0SsgContext } from "../../../RR0SsgContext"
import { CaseSource } from "./CaseSource"

export abstract class AbstractCaseSource<S> implements CaseSource<S> {
  protected summaries: S[]

  getSummaries(context: RR0SsgContext): S[] {
    if (!this.summaries) {
      this.summaries = this.readSummaries(context)
    }
    return this.summaries
  }

  async fetch(context: RR0SsgContext): Promise<S[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    return this.getSummaries(context).filter(c => {
      const sightingTime = c.dateTime
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    })
  }

  protected abstract readSummaries(context: RR0SsgContext): S[]
}
