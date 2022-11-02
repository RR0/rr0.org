import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

export class NoteReplacer {

  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const noteStr = this.number.toString()
    const noteId = `note-${noteStr}`
    const doc = context.inputFile.dom.window.document
    const result = doc.createElement("span")
    const a = doc.createElement("a")
    a.className = "note-id"
    a.href = `#${noteId}`
    a.textContent = noteStr
    result.appendChild(a)
    const contents = doc.createElement("span")
    contents.className = "note-contents"
    contents.id = noteId
    contents.innerHTML = original.innerHTML
    result.appendChild(contents)
    return result
  }
}
