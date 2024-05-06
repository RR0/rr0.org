import { UfoCaseContextFilter } from "./UfoCaseContextFilter"
import { RR0SsgContext } from "../../RR0SsgContext"
import { RR0UfoCase } from "./RR0UfoCase"

export class UfoCaseContextTimeFilter extends UfoCaseContextFilter {

  constructor(context: RR0SsgContext) {
    super(context)
  }

  filter(c: RR0UfoCase): boolean {
    const sightingTime = c.dateTime
    const time = this.context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
  }
}
