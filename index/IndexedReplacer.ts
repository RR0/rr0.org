import { DomReplacement } from "../time/DomReplacement"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

/**
 * Adds an index anchor element with the index id.
 */
export class IndexedReplacer implements DomReplacement<HtmlRR0SsgContext> {

  async replacement(context: HtmlRR0SsgContext, element: HTMLElement): Promise<HTMLElement> {
    const items = element.querySelectorAll("li")
    let value = 1
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      value = this.replaceItem(context, item, value)
    }
    return element
  }

  protected replaceItem(context: HtmlRR0SsgContext, item: HTMLLIElement, i: number): number {
    const anchor = item.querySelector(".index-anchor")
    let nextIndex: number
    if (!anchor) {
      const value = item.getAttribute("value")
      const valueIndex = parseInt(value, 10)
      nextIndex = Number.isInteger(valueIndex) ? valueIndex + 1 : i + 1
      const idOrValue = item.getAttribute("id") || value
      let dateTime: string
      if (!idOrValue) {
        dateTime = (item.querySelector("time") as HTMLTimeElement)?.dateTime
      }
      const id = idOrValue || dateTime || String(i)
      const anchorEl = context.file.document.createElement("span")
      anchorEl.id = id
      item.removeAttribute("id")
      if (!dateTime) {
        let valueStr: string
        if (value) {
          valueStr = value
        } else {
          const idNum = parseInt(id, 10)
          if (idNum) {
            valueStr = id
          }
        }
        if (valueStr) {
          item.setAttribute("value", valueStr)
        }
      }
      anchorEl.classList.add("index-anchor", "anchor")
      item.prepend(anchorEl)
      item.setAttribute("onclick", `window.location.hash='${id}';event.stopPropagation()`)
    } else {
      nextIndex = i
    }
    return nextIndex
  }
}
