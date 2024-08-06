import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { RR0Data } from "../RR0Data"
import { SourceRenderer } from "../source/SourceRenderer"
import { TimeElementFactory } from "./TimeElementFactory"
import { Source } from "../source/Source"

/**
 * Render a case summary as HTML.
 */
export class EventRenderer<D extends RR0Data> {

  constructor(readonly sourceRenderer: SourceRenderer) {
  }

  async render(context: HtmlRR0SsgContext, rr0Case: D): Promise<HTMLLIElement> {
    const outDoc = context.file.document
    const item = outDoc.createElement("li")
    await this.renderContent(context, rr0Case, item)
    return item
  }

  async renderContent(context: HtmlRR0SsgContext, rr0Data: D, container: HTMLElement) {
    const outDoc = context.file.document
    const time = rr0Data.time
    const timeEl = outDoc.createElement("time") as HTMLTimeElement
    const timeValue = timeEl.dateTime = time.toString()
    const dataContext = context.clone()
    if (typeof timeValue === "string") {
      TimeElementFactory.updateTimeFromStr(dataContext.time, timeValue)
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
    const sources = rr0Data.sources
    if (sources) {
      await this.renderSources(context, sources, container)
    }
    container.append(".")
  }

  async renderSources(context: HtmlRR0SsgContext, sources: Source[], container: HTMLElement) {
    sources.forEach(source => {
      const sourceEl = this.sourceRenderer.render(context, source)
      container.append(" ", sourceEl)
    })
  }
}
