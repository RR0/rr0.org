import { ContentStep, ContentStepConfig, OutputFunc } from "ssg-api"
import { HtmlRR0SsgContext } from "./RR0SsgContext"
import { TimeContext } from "./time/TimeContext"

export interface ContentVisitor {
  visit(context: HtmlRR0SsgContext): void
}

export class RR0ContentStep extends ContentStep<HtmlRR0SsgContext> {

  constructor(contentConfigs: ContentStepConfig[], outputFunc: OutputFunc,
              protected contentVisitors: ContentVisitor[] = []) {
    super(contentConfigs, outputFunc)
  }

  static setTimeFromPath(context: HtmlRR0SsgContext, filePath: string): TimeContext | undefined {
    context.time.reset()
    const newTimeContext = TimeContext.fromFileName(context, filePath)
    if (newTimeContext) {
      context.time.setYear(newTimeContext.getYear())
      context.time.setMonth(newTimeContext.getMonth())
      context.time.setDayOfMonth(newTimeContext.getDayOfMonth())
      context.time.from = context.time
    }
    return newTimeContext
  }

  protected async processFile(context: HtmlRR0SsgContext, filePath: string,
                              contentsConfig: ContentStepConfig): Promise<boolean> {
    context.time.reset()  // Don't use time context from previous page.
    RR0ContentStep.setTimeFromPath(context, filePath)
    const processed = await super.processFile(context, filePath, contentsConfig)
    return processed
  }

  protected shouldProcess(context: HtmlRR0SsgContext, _contentsConfig: ContentStepConfig): boolean {
    for (const contentVisitor of this.contentVisitors) {
      contentVisitor.visit(context)
    }
    return true // TODO: Don't process unmodified files
  }
}
