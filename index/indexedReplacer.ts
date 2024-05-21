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
    if (!anchor) {
      const idOrValue = item.getAttribute("id") || item.getAttribute("value")
      let dateTime: string
      if (!idOrValue) {
        dateTime = (item.querySelector("time") as HTMLTimeElement)?.dateTime
      }
      const id = idOrValue || dateTime || String(i + 1)
      const anchorEl = context.file.document.createElement("span")
      anchorEl.id = id
      item.removeAttribute("id")
      if (!dateTime) {
        item.setAttribute("value", id)
      }
      anchorEl.classList.add("index-anchor", "anchor")
      item.prepend(anchorEl)
      item.setAttribute("onclick", `window.location.hash='${id};event.preventDefault();event.stopPropagation()'`)
    }
  }
}
