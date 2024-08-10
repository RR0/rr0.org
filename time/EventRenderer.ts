import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { RR0Data } from "../RR0Data"
import { SourceRenderer } from "../source/SourceRenderer"
import { Source } from "../source/Source"
import { SourceFactory } from "../source/SourceFactory"
import { NoteRenderer } from "../note/NoteRenderer"
import { NamedPlace } from "./datasource/rr0/RR0CaseSummary"

/**
 * Render a case summary as HTML.
 */
export class EventRenderer<D extends RR0Data> {

  constructor(protected noteRenderer: NoteRenderer, protected sourceFactory: SourceFactory,
              readonly sourceRenderer: SourceRenderer) {
  }

  async render(context: HtmlRR0SsgContext, data: D): Promise<HTMLLIElement> {
    const outDoc = context.file.document
    const item = outDoc.createElement("li")
    await this.renderContent(context, data, item)
    return item
  }

  placeElement(context: HtmlRR0SsgContext, namedPlace: NamedPlace) {
    const doc = context.file.document
    const birthPlace = doc.createElement("span")
    birthPlace.className = "place"
    birthPlace.textContent = namedPlace.name || ""
    return birthPlace
  }

  async renderContent(context: HtmlRR0SsgContext, data: D, container: HTMLElement) {
    const outDoc = context.file.document
    const time = data.time
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
    const place = data.place
    if (place) {
      container.append(" À ")
      container.append(this.placeElement(context, place))
    }
    container.append(", ", data.description)
    const notes = data.notes
    if (notes) {
      await this.renderNotes(context, notes, container)
    }
    const sources = data.sources
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
