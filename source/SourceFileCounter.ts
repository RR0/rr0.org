import { PerFileCounter } from "../PerFileCounter.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"

/**
 * Count sources per file.
 */
export class SourceFileCounter extends PerFileCounter<HtmlRR0SsgContext> {

  get value(): string {
    const value = super.value
    return "s" + value
  }
}
