import {ContentStep, ContentStepConfig, SsgContext} from "ssg-api"
import {RR0SsgContext} from "./RR0SsgContext"

export class RR0ContentStep extends ContentStep {

  protected processFile(context: RR0SsgContext, filePath: string, contentsConfig: ContentStepConfig,
                        contentCount: number): Promise<number> {
    context.time.reset()  // Don't use time context from previous page.
    return super.processFile(context, filePath, contentsConfig, contentCount)
  }

  protected shouldProcess(_context: SsgContext): boolean {
    return true // TODO: Don't process unmodified files
  }
}
