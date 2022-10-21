import {SsgContext} from "../../../../../SsgContext"

export class NoteReplacer {

  protected number = 0

  replacement(context: SsgContext, match: string, content: string): string {
    this.number++
    const noteStr = this.number.toString()
    const noteId = `note-${noteStr}`
    return `<a class="note-id" href="#${noteId}">${noteStr}</a> <span class="note-contents" id="${noteId}">${content}</span>`
  }
}
