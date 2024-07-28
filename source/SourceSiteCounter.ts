import { PerFileCounter } from "../PerFileCounter"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

/**
 * Count sources in the whole website.
 */
export class SourceSiteCounter extends PerFileCounter<HtmlRR0SsgContext> {

  get value(): string {
    const value = super.value
    return "s" + value
  }

  next(_context: HtmlRR0SsgContext): string {
    this.number++
    return this.value
  }
}
