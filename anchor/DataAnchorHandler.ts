import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { DataService } from "../DataService"
import { Rr0Data } from "../Rr0Data"

export class DataAnchorHandler implements AnchorHandler {

  /**
   * Source counter in the page.
   */
  protected number = 0

  constructor(protected dataService: DataService<Rr0Data>) {
  }

  handle(context: HtmlRR0SsgContext, linkEl: HTMLAnchorElement, pathToSearch: string) {
    if (this.dataService.dirs.find(dir => dir.startsWith(pathToSearch))) {
      const data = this.dataService.read(context, pathToSearch)
      const type = data?.type
      switch (type) {
        case "api":
          this.handleApi(context, data, linkEl)
          break
        case "product":
          this.handleProduct(context, data, linkEl)
          break
        case "org":
          //  this.handleOrg(context, data, linkEl)
          break
      }
    }
  }

  protected handleNote(context: HtmlRR0SsgContext, linkEl: HTMLAnchorElement, note: string) {
    this.number++
    const noteStr = this.number.toString()
    const noteId = `deprecated-${noteStr}`
    const outputDoc = context.outputFile.document
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

  protected handleApi(context: HtmlRR0SsgContext, data: Rr0Data, linkEl: HTMLAnchorElement) {
    const deprecated = data.deprecated
    if (deprecated) {
      linkEl.classList.add("deprecated")
    }
    const note = data.note
    if (note) {
      this.handleNote(context, linkEl, note)
    }
  }

  protected handleProduct(context: HtmlRR0SsgContext, data: Rr0Data, linkEl: HTMLAnchorElement) {
    return this.handleApi(context, data, linkEl)
  }

  protected handleOrg(context: HtmlRR0SsgContext, data: Rr0Data, linkEl: HTMLAnchorElement) {
    return this.handleApi(context, data, linkEl)
  }
}
