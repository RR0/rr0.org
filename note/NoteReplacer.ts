import { NoteRenderer } from "./NoteRenderer"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

export class NoteReplacer {

  constructor(protected renderer: NoteRenderer) {
  }

  replacement(context: HtmlRR0SsgContext, original: HTMLElement): HTMLElement {
    return this.renderer.render(context, original.innerHTML)
  }
}
