import {HtmlSsgContext} from "ssg-api"

export class SourceReplacer {
  /**
   * Source counter in the page.
   */
  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const sourceStr = String.fromCharCode(96 + this.number)
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    const a = outputDoc.createElement("a")
    a.className = "source-id"
    a.ariaLabel = "Source"
    a.href = `#${sourceId}`
    a.textContent = sourceStr
    replacement.appendChild(a)
    const contents = outputDoc.createElement("span")
    contents.id = sourceId
    contents.className = "source-contents"
    contents.innerHTML = original.innerHTML
    replacement.appendChild(contents)
    return replacement
  }
}
