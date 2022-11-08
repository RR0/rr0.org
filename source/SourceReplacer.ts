import {HtmlSsgContext} from "../tool/HtmlSsgContext"
import {LocalAnchor} from "../tool/step/content/replace/html/LocalAnchor"

export class SourceReplacer {
  /**
   * Source counter in the page.
   */
  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const sourceStr = String.fromCharCode(96 + this.number)
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.outputFile.dom.window.document
    const replacement = outputDoc.createElement("span")
    const a = outputDoc.createElement("a")
    a.className = "source-id"
    a.href = `#${sourceId}`
    a.textContent = sourceStr
    replacement.appendChild(a)
    const contents = outputDoc.createElement("span")
    contents.className = "source-contents"
    contents.innerHTML = LocalAnchor.createHTML(outputDoc, sourceId) + original.innerHTML
    replacement.appendChild(contents)
    return replacement
  }
}
