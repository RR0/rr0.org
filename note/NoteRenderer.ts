import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { ReferenceGenerator } from "../ReferenceGenerator"

export class NoteRenderer {

  constructor(protected counter: ReferenceGenerator<any>) {
  }

  render(context: HtmlRR0SsgContext, html: string): HTMLElement {
    const noteId = this.counter.next(context)
    const doc = context.file.document
    const replacement = doc.createElement("span")
    replacement.className = "note-id"
    replacement.ariaLabel = "Note"
    replacement.textContent = noteId
    const contents = doc.createElement("span")
    contents.className = "note-contents"
    contents.innerHTML = html
    const anchor = doc.createElement("span")
    anchor.id = noteId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
  }
}
