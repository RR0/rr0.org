import { PerFileCounter } from "../PerFileCounter.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"

export class NoteFileCounter extends PerFileCounter<HtmlRR0SsgContext> {

  get value(): string {
    return "n" + this.number
  }
}
