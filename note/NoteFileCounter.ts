import { PerFileCounter } from "../PerFileCounter"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

export class NoteFileCounter extends PerFileCounter<HtmlRR0SsgContext> {

  get value(): string {
    return "n" + this.number
  }
}
