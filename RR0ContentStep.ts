import { ContentStep, ContentStepConfig, HtmlLinks, HtmlMeta, OutputFunc } from "ssg-api"
import { HtmlRR0SsgContext } from "./RR0SsgContext"
import { Time } from "./time/Time"
import { TimeContext } from "./time/TimeContext"

export class RR0ContentStep extends ContentStep<HtmlRR0SsgContext> {
  constructor(contentConfigs: ContentStepConfig[], outputFunc: OutputFunc,
              protected bookMeta: Map<string, HtmlMeta>, protected bookLinks: Map<string, HtmlLinks>) {
    super(contentConfigs, outputFunc)
  }


  static setTimeFromPath(context: HtmlRR0SsgContext, filePath: string): TimeContext | undefined {
    context.time.reset()
    const newTimeContext = Time.contextFromFile(context, filePath)
    if (newTimeContext) {
      context.time.setYear(newTimeContext.getYear())
      context.time.setMonth(newTimeContext.getMonth())
      context.time.setDayOfMonth(newTimeContext.getDayOfMonth())
      context.time.from = context.time
    }
    return newTimeContext
  }

  protected processFile(context: HtmlRR0SsgContext, filePath: string, contentsConfig: ContentStepConfig,
                        contentCount: number): Promise<number> {
    context.time.reset()  // Don't use time context from previous page.
    RR0ContentStep.setTimeFromPath(context, filePath)
    return super.processFile(context, filePath, contentsConfig, contentCount)
  }

  protected shouldProcess(context: HtmlRR0SsgContext): boolean {
    const bookMeta = this.bookMeta.get(context.inputFile.name)
    Object.assign(context.inputFile.meta, bookMeta)
    const bookLinks = this.bookLinks.get(context.inputFile.name)
    Object.assign(context.inputFile.links, bookLinks)
    return true // TODO: Don't process unmodified files
  }
}
