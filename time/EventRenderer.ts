import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { RR0Data } from "../data/RR0Data"
import { SourceRenderer } from "../source/SourceRenderer"
import { Source } from "../source/Source"
import { SourceFactory } from "../source/SourceFactory"
import { NoteRenderer } from "../note/NoteRenderer"
import { NamedPlace } from "./datasource/rr0/RR0CaseSummary"
import { TimeElementFactory } from "./TimeElementFactory"
import assert from "assert"
import { RR0Event } from "../event/RR0Event"

/**
 * Render a case summary as HTML.
 */
export class EventRenderer<E extends RR0Event> {

  constructor(
    protected noteRenderer: NoteRenderer, protected sourceFactory: SourceFactory,
    readonly sourceRenderer: SourceRenderer, protected timeElementFactory: TimeElementFactory
  ) {
  }

  placeElement(context: HtmlRR0SsgContext, namedPlace: NamedPlace) {
    const doc = context.file.document
    const birthPlace = doc.createElement("span")
    birthPlace.className = "place"
    birthPlace.textContent = namedPlace.name || ""
    return birthPlace
  }

  async renderEnd(context: HtmlRR0SsgContext, event: RR0Data, container: HTMLElement) {
    const sources = event.sources
    if (sources) {
      await this.renderSources(context, sources, container)
    }
    const notes = event.notes
    if (notes) {
      await this.renderNotes(context, notes, container)
    }
    container.append(".")
  }

  async render(context: HtmlRR0SsgContext, event: E, container: HTMLElement) {
    const eventContext = context.clone()
    const eventTime = eventContext.time = event.time
    assert.ok(eventTime, `Event of type "${event.type}" has no time`)
    container.dataset.time = eventTime.toString()
    const timeEl = this.timeElementFactory.create(eventContext, context)
    container.append(timeEl)
    const place = event.place
    if (place) {
      container.append(" À ")
      container.append(this.placeElement(context, place))
    }
    container.append(", ", event.description)
    const notes = event.notes
    if (notes) {
      await this.renderNotes(context, notes, container)
    }
    const sources = event.sources
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
