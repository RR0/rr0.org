import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { RR0Data } from "../RR0Data"
import { SourceRenderer } from "../source/SourceRenderer"
import { Source } from "../source/Source"
import { SourceFactory } from "../source/SourceFactory"
import { NoteRenderer } from "../note/NoteRenderer"

/**
 * Render a case summary as HTML.
 */
export class EventRenderer<D extends RR0Data> {

  constructor(protected noteRenderer: NoteRenderer, protected sourceFactory: SourceFactory,
              readonly sourceRenderer: SourceRenderer) {
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
      dataContext.time.updateFromStr(timeValue)
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
    const notes = rr0Data.notes
    if (notes) {
      await this.renderNotes(context, notes, container)
    }
    const sources = rr0Data.sources
    if (sources) {
      await this.renderSources(context, sources, container)
    }
    container.append(".")
  }

  async renderNotes(context: HtmlRR0SsgContext, notes: string[], container: HTMLElement) {
    for (const noteStr of notes) {
      const sourceEl = this.noteRenderer.render(context, noteStr)
      container.append(" ", sourceEl)
    }
  }
  async renderSources(context: HtmlRR0SsgContext, sources: Source[], container: HTMLElement) {
    for (const source of sources) {
      const href = source.url
      const resolvedSource = href ? await this.sourceFactory.create(context, href.toString()) : source
      const sourceEl = this.sourceRenderer.render(context, resolvedSource)
      container.append(" ", sourceEl)
    }
  }
}
