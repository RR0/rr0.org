import { CaseSource } from "./CaseSource"
import { RR0SsgContext } from "../../RR0SsgContext"
import { UfoCase } from "./UfoCase"

/**
 * Cache cases which were already fetched, and filter out cases in memory according to (time) context.
 */
export abstract class AbstractCaseSource<S extends UfoCase> implements CaseSource<S> {

  protected cases: S[]

  protected constructor(readonly authors: string[], readonly copyright: string) {
  }

  async getSummaries(context: RR0SsgContext): Promise<S[]> {
    if (!this.cases) {
      this.cases = await this.readCases(context)
    }
    return this.cases
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

  protected abstract readCases(context: RR0SsgContext): Promise<S[]>
}
