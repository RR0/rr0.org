import { UrecatCase } from "./UrecatCase"
import { CaseSource } from "../CaseSource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class UrecatDatasource implements CaseSource<UrecatCase> {
  readonly authors = ["Gross, Patrick"]
  readonly copyright = "URECAT (Les ovnis vus de près)"

  async getSummaries(context: RR0SsgContext): Promise<UrecatCase[]> {
    if (!this.summaries) {
      this.summaries = await this.readSummaries(context)
    }
    return this.summaries
  }

  async fetch(context: RR0SsgContext): Promise<UrecatCase[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const summaries = await this.getSummaries(context)
    return summaries.filter(c => {
      const sightingTime = c.dateTime
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    })
  }

  protected abstract readSummaries(context: RR0SsgContext): Promise<UrecatCase[]>
}
