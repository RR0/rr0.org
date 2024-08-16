import { ContextFilter } from "./ContextFilter"
import { RR0SsgContext } from "../../RR0SsgContext"
import { RR0CaseSummary } from "./rr0/RR0CaseSummary"

export class RR0CaseSummaryContextFilter extends ContextFilter<RR0CaseSummary> {

  constructor(context: RR0SsgContext) {
    super(context)
  }

  filter(c: RR0CaseSummary): boolean {
    const sightingTime = c.time
    const time = this.context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
  }
}
