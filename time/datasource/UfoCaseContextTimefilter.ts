import { UfoCaseContextFilter } from "./UfoCaseContextFilter"
import { RR0SsgContext } from "../../RR0SsgContext"
import { UfoCase } from "./UfoCase"

export class UfoCaseContextTimeFilter extends UfoCaseContextFilter {

  constructor(context: RR0SsgContext) {
    super(context)
  }

  filter(c: UfoCase): boolean {
    const sightingTime = c.dateTime
    const day = this.context.time.getDayOfMonth()
    const month = this.context.time.getMonth()
    const year = this.context.time.getYear()
    return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
  }
}
