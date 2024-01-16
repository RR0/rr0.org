import { HtmlSsgContext } from 'ssg-api';

export class NoteReplacer {

  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const noteStr = String.fromCharCode(96 + this.number)
    const noteId = `note-${noteStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    replacement.className = 'note-id ';
    replacement.ariaLabel = 'Note';
    replacement.textContent = noteStr;
    outputDoc.createElement('span').appendChild(replacement);
    const contents = outputDoc.createElement("span")
    contents.className = 'note-contents';
    contents.innerHTML = original.innerHTML
    const anchor = outputDoc.createElement('span');
    anchor.id = noteId;
    anchor.className = 'anchor';
    outputDoc.createElement('span').append(anchor, contents);
    return outputDoc.createElement('span');
  }
}
