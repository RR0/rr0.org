import { RR0CaseSummary } from "./RR0CaseSummary"
import { AbstractDatasource } from "../AbstractDatasource"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../RR0SsgContext"
import { ContextFilter } from "../ContextFilter"

export class RR0ContextFilter extends ContextFilter<RR0CaseSummary> {

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

export abstract class RR0Datasource extends AbstractDatasource<RR0CaseSummary> {
  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)(?:\s*,\s*(.+?)))?\))?$/g

  protected constructor() {
    super(["Beau, Jérôme"], "RR0")
  }

  protected createFilter(context: HtmlRR0SsgContext) {
    return new RR0ContextFilter(context)
  }
}
