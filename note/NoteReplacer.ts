import { HtmlSsgContext } from "ssg-api"
import { ReferenceGenerator } from "../ReferenceGenerator"

export class NoteReplacer {

  constructor(protected counter: ReferenceGenerator<any>) {
  }

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    const noteId = this.counter.next(context)
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "note-id"
    replacement.ariaLabel = "Note"
    replacement.textContent = noteId
    const contents = outputDoc.createElement("span")
    contents.className = "note-contents"
    contents.innerHTML = original.innerHTML
    const anchor = outputDoc.createElement("span")
    anchor.id = noteId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
  }
}
