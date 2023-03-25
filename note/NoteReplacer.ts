import {HtmlSsgContext} from "ssg-api"

export class NoteReplacer {

  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const noteStr = String.fromCharCode(96 + this.number)
    const noteId = `note-${noteStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    const a = outputDoc.createElement("a")
    a.className = "note-id"
    a.ariaLabel = "Note"
    a.href = `#${noteId}`
    a.textContent = noteStr
    replacement.appendChild(a)
    const contents = outputDoc.createElement("span")
    contents.id = noteId
    contents.className = "note-contents"
    contents.innerHTML = original.innerHTML
    replacement.appendChild(contents)
    return replacement
  }
}
