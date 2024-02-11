import { HtmlRR0SsgContext } from "../../RR0SsgContext"

export abstract class ChronologySource {

  protected constructor(readonly author: string, readonly copyright: string) {
  }

  abstract get(context: HtmlRR0SsgContext): Promise<HTMLLIElement[]>

  protected sourceElement(context: HtmlRR0SsgContext): HTMLElement {
    const sourceEl = context.outputFile.document.createElement("span")
    sourceEl.className = "source"
    sourceEl.innerHTML = `${this.author}: <i>${this.copyright}</i>`
    return sourceEl
  }
}
