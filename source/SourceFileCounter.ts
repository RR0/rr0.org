import { PerFileCounter } from "../PerFileCounter"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

/**
 * Count sources per file.
 */
export class SourceFileCounter extends PerFileCounter<HtmlRR0SsgContext> {

  get value(): string {
    const value = super.value
    return "s" + value
  }
}
