import { NoteRenderer } from "./NoteRenderer.js"
import { HtmlRR0SsgContext } from "../RR0SsgContext.js"

export class NoteReplacer {

  constructor(protected renderer: NoteRenderer) {
  }

  replacement(context: HtmlRR0SsgContext, original: HTMLElement): HTMLElement {
    return this.renderer.render(context, original.innerHTML)
  }
}
