import {HtmlSsgContext} from "../../../../../HtmlSsgContext"

export class SourceReplacer {

  protected number = 0

  replacement(context: HtmlSsgContext, original: Element): Element {
    this.number++
    const sourceStr = String.fromCharCode(97 + this.number)
    const sourceId = `source-${sourceStr}`
    const doc = context.currentFile!.dom.window.document
    const result = doc.createElement("span")
    const a = doc.createElement("a")
    a.className = "source-id"
    a.href = `#${sourceId}`
    a.textContent = sourceStr
    result.appendChild(a)
    const contents = doc.createElement("span")
    contents.className = "source-contents"
    contents.id = sourceId
    contents.innerHTML = original.innerHTML
    result.appendChild(contents)
    return result
  }
}
