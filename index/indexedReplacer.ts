import { DomReplacement } from "../time/DomReplacement"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

export class IndexedReplacer implements DomReplacement<HtmlRR0SsgContext> {

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const items = element.querySelectorAll("li")
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this.replaceItem(context, item, i)
    }
    return element
  }

  protected replaceItem(context: HtmlRR0SsgContext, item: HTMLLIElement, i: number) {
    const anchor = item.querySelector(".index-anchor")
    const hasNote = item.innerHTML.includes("<span>")
    if (!anchor) {
      const anchorEl = context.outputFile.document.createElement("span")
      const id = item.getAttribute("id") || item.getAttribute("value") || String(i + 1)
      anchorEl.id = id
      item.removeAttribute("id")
      item.setAttribute("value", id)
      anchorEl.classList.add("index-anchor", "anchor")
      item.prepend(anchorEl)
      item.setAttribute("onclick", "window.location.hash=" + id)
    }
  }
}
