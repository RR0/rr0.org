import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { AllDataService } from "../data/AllDataService"
import { RR0Data } from "../data/RR0Data"

export class DataAnchorHandler implements AnchorHandler {

  /**
   * Source counter in the page.
   */
  protected number = 0

  constructor(protected dataService: AllDataService) {
  }

  async handle(context: HtmlRR0SsgContext, linkEl: HTMLAnchorElement, pathToSearch: string): Promise<void> {
    const dataList = await this.dataService.getFromDir(pathToSearch, ["api", "product", "org"], ["index.json"])
    for (const data of dataList) {
      const type = data?.type
      switch (type) {
        case "api":
          this.handleApi(context, data, linkEl)
          break
        case "product":
          this.handleProduct(context, data, linkEl)
          break
        case "org":
          this.handleOrg(context, data, linkEl)
          break
      }
    }
  }

  protected handleNote(context: HtmlRR0SsgContext, linkEl: HTMLAnchorElement, note: string) {
    this.number++
    const noteStr = this.number.toString()
    const noteId = `deprecated-${noteStr}`
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    replacement.className = "note-id"
    replacement.ariaLabel = "Note"
    replacement.textContent = "d" + noteStr
    const contents = outputDoc.createElement("span")
    contents.className = "note-contents"
    contents.innerHTML = note
    const anchor = outputDoc.createElement("span")
    anchor.id = noteId
    anchor.className = "anchor"
    replacement.append(anchor, contents)
    linkEl.parentNode.insertBefore(replacement, linkEl.nextSibling)
  }

  protected handleApi(context: HtmlRR0SsgContext, data: RR0Data, linkEl: HTMLAnchorElement) {
    const next = data.next
    if (linkEl.classList.contains("deprecated")) {
      return
    }
    if (next) {
      linkEl.classList.add("deprecated")
      let note = data.note
      if (!note) {
        note = `Remplacé par ${next}`
      }
      this.handleNote(context, linkEl, note)
    }
  }

  protected handleProduct(context: HtmlRR0SsgContext, data: RR0Data, linkEl: HTMLAnchorElement) {
    return this.handleApi(context, data, linkEl)
  }

  protected handleOrg(context: HtmlRR0SsgContext, data: RR0Data, linkEl: HTMLAnchorElement) {
    return this.handleApi(context, data, linkEl)
  }
}
