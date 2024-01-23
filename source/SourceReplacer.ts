import { HtmlSsgContext } from "ssg-api"

export class SourceReplacer {
  /**
   * Source counter in the page.
   */
  protected number = 0

  replacement(context: HtmlSsgContext, original: HTMLElement): HTMLElement {
    this.number++
    const sourceStr = this.number.toString()
    const sourceId = `source-${sourceStr}`
    const outputDoc = context.outputFile.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "source-id"
    replacement.ariaLabel = "Source"
    replacement.textContent = "s" + sourceStr
    const contents = outputDoc.createElement("span")
    contents.className = "source-contents"
    contents.innerHTML = original.innerHTML
    const anchor = outputDoc.createElement("span")
    anchor.id = sourceId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    return replacement
  }
}
