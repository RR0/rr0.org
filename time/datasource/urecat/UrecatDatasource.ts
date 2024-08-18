import { UrecatCase } from "./UrecatCase"
import { Datasource } from "../Datasource"
import { RR0SsgContext } from "../../../RR0SsgContext"

export abstract class UrecatDatasource implements Datasource<UrecatCase> {
  readonly authors = ["Gross, Patrick"]
  readonly copyright = "URECAT (Les ovnis vus de près)"

  async getSummaries(context: RR0SsgContext): Promise<UrecatCase[]> {
    if (!this.summaries) {
      this.summaries = await this.readSummaries(context)
    }
    return this.summaries
  }

  async fetch(context: RR0SsgContext): Promise<UrecatCase[]> {
    const time = context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    const summaries = await this.getSummaries(context)
    return summaries.filter(c => {
      const sightingTime = c.time
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    })
  }

  protected abstract readSummaries(context: RR0SsgContext): Promise<UrecatCase[]>
}
