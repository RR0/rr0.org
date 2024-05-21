import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { SourceRenderer } from "./SourceRenderer"
import { RR0Data } from "../RR0Data"
import { TimeReplacer } from "./TimeReplacer"

/**
 * Render a case summary as HTML.
 */
export class EventRenderer<D extends RR0Data> {

  constructor(readonly sourceRenderer: SourceRenderer) {
  }

  render(context: HtmlRR0SsgContext, rr0Case: D): HTMLLIElement {
    const outDoc = context.file.document
    const item = outDoc.createElement("li")
    this.renderContent(context, rr0Case, item)
    return item
  }

  renderContent(context: HtmlRR0SsgContext, rr0Data: D, container: HTMLElement): void {
    const outDoc = context.file.document
    const time = rr0Data.dateTime
    const timeEl = outDoc.createElement("time") as HTMLTimeElement
    const timeValue = timeEl.dateTime = time.toString()
    const dataContext = context.clone()
    if (typeof timeValue === "string") {
      TimeReplacer.updateTimeFromStr(dataContext.time, timeValue)
    } else {
      Object.assign(dataContext.time, timeValue)
    }
    timeEl.textContent = TimeTextBuilder.build(dataContext)
    container.append(timeEl)
    const place = rr0Data.place
    if (place) {
      container.append(" À ")
      const placeEl = outDoc.createElement("span")
      placeEl.className = "place"
      placeEl.textContent = place?.name || ""
      container.append(placeEl)
    }
    container.append(", ", rr0Data.description)
    rr0Data.sources.forEach(source => {
      const sourceEl = this.sourceRenderer.render(context, source)
      container.append(" ", sourceEl)
    })
    container.append(".")
  }
}
