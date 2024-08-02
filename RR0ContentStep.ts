import { ContentStep, ContentStepConfig, FileContents, OutputFunc } from "ssg-api"
import { HtmlRR0SsgContext } from "./RR0SsgContext"
import { TimeContext } from "./time/TimeContext"

export interface ContentVisitor {
  visit(context: HtmlRR0SsgContext): Promise<void>
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
    this.setContextFromFile(context, filePath)
    return super.processFile(context, filePath, contentsConfig)
  }

  protected setContextFromFile(context: HtmlRR0SsgContext, filePath: string) {
    this.setTimeFromPath(context, filePath)
  }

  protected setTimeFromPath(context: HtmlRR0SsgContext, filePath: string) {
    context.time.reset()  // Don't use time context from previous page.
    RR0ContentStep.setTimeFromPath(context, filePath)
  }

  async write(context: HtmlRR0SsgContext, outputFile: FileContents): Promise<void> {
    context.file.contents = context.file.serialize()
    return super.write(context, outputFile)
  }

  protected async shouldProcess(context: HtmlRR0SsgContext, _contentsConfig: ContentStepConfig): Promise<boolean> {
    const should = true   // TODO: Don't process unmodified files
    if (should) {
      for (const contentVisitor of this.contentVisitors) {
        await contentVisitor.visit(context)
      }
    }
    return should
  }
}
