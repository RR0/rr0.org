import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

/**
 * Register images (`<img>` tags) required in an HTML file.
 */
export class UnitReplaceCommand extends DomReplaceCommand {

  constructor() {
    super("*[itemscope]")
  }

  protected async createReplacer(context: HtmlRR0SsgContext): Promise<DomReplacer> {
    return {
      replace: async (itemEl: HTMLElement) => {
        if (itemEl.getAttribute("itemtype") === "https://schema.org/QuantitativeValue") {
          const propEls = Array.from(itemEl.querySelectorAll("*[itemprop]"))
          const unitPropEl = propEls.find(propEl => propEl.getAttribute("itemprop") === "unitCode")
          const unit = unitPropEl.getAttribute("content")
          const valuePropEl = propEls.find(propEl => propEl.getAttribute("itemprop") === "value")
          const value = parseInt(valuePropEl.textContent, 10)
          const resultEl = context.file.document.createElement("span")
          resultEl.title = value + " " + unit
          let resultContent
          switch (unit) {
            case "SMI":
              resultContent = context.messages.unit.smi(value)
              break
            case "FOT":
              resultContent = context.messages.unit.fot(value)
              break
            case "HM":
              resultContent = context.messages.unit.hm(value)
              break
            case "INH":
              resultContent = context.messages.unit.inh(value)
              break
          }
          resultEl.textContent = resultContent
          itemEl = resultEl
        }
        return itemEl
      }
    }
  }
}
