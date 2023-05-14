import {ContentStep, ContentStepConfig, SsgContext} from "ssg-api"
import {HtmlRR0SsgContext} from "./RR0SsgContext"
import {Time} from "./time/Time"

export class RR0ContentStep extends ContentStep<HtmlRR0SsgContext> {

  protected processFile(context: HtmlRR0SsgContext, filePath: string, contentsConfig: ContentStepConfig,
                        contentCount: number): Promise<number> {
    context.time.reset()  // Don't use time context from previous page.
    const newTimeContext = Time.contextFromFile(context, filePath)
    if (newTimeContext) {
      context.time.setYear(newTimeContext.getYear())
      context.time.setMonth(newTimeContext.getMonth())
      context.time.setDayOfMonth(newTimeContext.getDayOfMonth())
      context.time.setHour(undefined)
      context.time.setMinutes(undefined)
    }
    return super.processFile(context, filePath, contentsConfig, contentCount)
  }

  protected shouldProcess(_context: SsgContext): boolean {
    return true // TODO: Don't process unmodified files
  }
}
