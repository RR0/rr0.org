import { HtmlSsgContext } from "ssg-api"

export class NoteReplacer {
  /**
   * Source counter in the page.
   */
  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const noteStr = this.number.toString()
    const noteId = `note-${noteStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "note-id"
    replacement.ariaLabel = "Note"
    replacement.textContent = "n" + noteStr
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
