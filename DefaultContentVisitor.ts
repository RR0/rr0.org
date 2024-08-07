import { DataService } from "./DataService"
import { TimeElementFactory } from "./time/TimeElementFactory"
import { ContentVisitor } from "./RR0ContentStep"
import { HtmlRR0SsgContext } from "./RR0SsgContext"
import path from "path"
import { RR0Data } from "./RR0Data"
import { NamedPlace } from "./time/datasource/rr0/RR0CaseSummary"
import { EventRenderer } from "./time/EventRenderer"
import { People } from "./people/People"
import { PeopleFactory } from "./people/PeopleFactory"
import { RR0Event } from "./RR0Event"
import { SourceFactory } from "./source/SourceFactory"
import { Source } from "./source/Source"

export class DefaultContentVisitor implements ContentVisitor {

  constructor(protected service: DataService, protected eventRenderer: EventRenderer<RR0Data>,
              protected timeElementFactory: TimeElementFactory, protected sourceFactory: SourceFactory) {
  }

  async visit(context: HtmlRR0SsgContext) {
    const dirName = path.dirname(context.file.name)
    const dataList = await this.service.getFromDir(dirName,
      ["people", "case", "sighting", "api", "product", "org"], ["index.json", "case.json", "people.json"])
    if (dataList.length > 0) {
      for (const data of dataList) {
        switch (data.type) {
          case "people":
            context.people = data
            break
        }
        await this.process(context, data)
      }
    }
  }

  protected async process(context: HtmlRR0SsgContext, data: RR0Data) {
    this.processTitle(context, data)
    this.processURL(context, data)
    const events = data.events.sort(
      (event1, event2) => event1.time ? event2.time ? event1.time.isBefore(event2.time) ? -1 : 1 : -1 : 1)
    if (!events.find(event => event.type === "image" && PeopleFactory.defaultPortraitFileNames.includes(
      event.url as unknown as string))) {
      events.push({type: "image", url: data.image as any, name: data.name, events: []})
    }
    const doc = context.file.document
    for (const event of events) {
      switch (event.type) {
        case "birth":
          await this.processBirth(context, event, data)
          break
        case "book":
          await this.processBook(context, event)
          break
        case "image":
          await this.processImage(context, event)
          break
        case "death":
          await this.processDeath(context, event, data)
          break
        default:
          const eventEl = await this.eventRenderer.render(context, event)
          doc.append(eventEl)
      }
    }
    const minTime = context.time.min
    if (minTime) {
      const timeScript = doc.createElement("script")
      timeScript.textContent = `customElements.whenDefined('rr0-dual-range').then(() => initTime("${minTime.getYear()}","${context.time.max.getYear()}"))`
      doc.documentElement.append(timeScript)
    }
    context.file.contents = context.file.serialize()
  }

  protected async processImage(context: HtmlRR0SsgContext, imageData: RR0Data) {
    const doc = context.file.document
    const side = context.people ? "left" : "right"
    const portraitEl = doc.querySelector(`.contents figcaption`)
    const caption = imageData.name
    if (!portraitEl || portraitEl.textContent !== caption) {
      const parentEl = doc.querySelector(".contents")
      if (parentEl) {
        const imgEl = doc.createElement("img")
        imgEl.src = imageData.url as any
        imgEl.alt = imageData.title
        const figcaptionEl = doc.createElement("figcaption")
        figcaptionEl.textContent = caption
        const figureEl = doc.createElement("figure")
        figureEl.classList.add(side, "side")
        figureEl.append(imgEl)
        figureEl.append(figcaptionEl)
        const insertEl = parentEl.querySelector("*")
        parentEl.insertBefore(figureEl, insertEl)
      }
    }
  }

  protected async renderSources(context: HtmlRR0SsgContext, sources: Source[], eventP: HTMLParagraphElement) {
    const resolvedSources: Source[] = []
    for (const source of sources) {
      const href = source.url
      const resolvedSource = href ? await this.sourceFactory.create(context, href.toString()) : source
      resolvedSources.push(resolvedSource)
    }
    await this.eventRenderer.renderSources(context, resolvedSources, eventP)
  }

  protected timeParagraph(context: HtmlRR0SsgContext, event: RR0Data) {
    const eventP = context.file.document.createElement("p")
    const eventContext = context.clone()
    const eventTime = event.time
    const time = context.time
    if (!time.min || eventTime.isBefore(time.min)) {
      time.min = eventTime
    }
    if (!time.max || eventTime.isAfter(time.max)) {
      time.max = eventTime
    }
    const timeStr = eventTime.toString()
    eventP.dataset.time = timeStr
    const timeEl = this.timeElementFactory.create(eventContext, timeStr, context)
    return {eventP, timeEl}
  }

  protected async processBirth(context: HtmlRR0SsgContext, event: RR0Data, entity: RR0Data) {
    const parentEl = context.file.document.querySelector(".contents")
    if (parentEl) {
      const {eventP, timeEl} = this.timeParagraph(context, event)
      const name = entity.surname ? "\"" + entity.surname + "\"" : entity.name || entity.title
      eventP.append(name)
      eventP.append(context.messages[entity.type].birth)
      eventP.append(timeEl)
      if (event.place) {
        eventP.append(" à ")
        const birthPlace = this.placeElement(context, event.place)
        eventP.append(birthPlace)
      }
      const sources = event.sources
      if (sources) {
        await this.eventRenderer.renderSources(context, sources, eventP)
      }
      eventP.append(".")
      const insertEl = parentEl.firstElementChild
      parentEl.insertBefore(eventP, insertEl)
    } else {
      context.warn("no .content in", context.file.name)
    }
  }

  protected async processDeath(context: HtmlRR0SsgContext, event: RR0Event, entity: RR0Data) {
    const {eventP, timeEl} = this.timeParagraph(context, event)
    const name = entity.name
    eventP.append(name)
    eventP.append(context.messages[entity.type].death)
    eventP.append(timeEl)
    if (event.place) {
      eventP.append(" à ")
      const birthPlace = this.placeElement(context, event.place)
      eventP.append(birthPlace)
    }
    const sources = event.sources
    if (sources) {
      await this.renderSources(context, sources, eventP)
    }
    eventP.append(".")
    const insertEl = context.file.document.querySelector(".contents > p:last-of-type")
    insertEl.parentNode.append(eventP)
  }

  protected async processBook(context: HtmlRR0SsgContext, bookData: RR0Data) {
    const doc = context.file.document
    const parentEl = doc.querySelector(".contents")
    if (parentEl) {
      const bookEl = doc.createElement("p")
      const people = context.people as unknown as People
      const birthContext = context.clone()
      const birthTimeStr = bookData.time
      const bookDateEl = this.timeElementFactory.create(birthContext, birthTimeStr.toString(), context)
      bookEl.append(bookDateEl, " ")
      bookEl.append((people.gender === "female" ? "elle" : "il") + " écrit un livre")
      await this.renderSources(context, bookData.sources, bookEl)
      bookEl.append(".")
      parentEl.append(bookEl)
    } else {
      context.warn("no .content in " + context.file.name)
    }
  }

  private placeElement(context: HtmlRR0SsgContext, namedPlace: NamedPlace) {
    const doc = context.file.document
    const birthPlace = doc.createElement("span")
    birthPlace.className = "place"
    birthPlace.textContent = namedPlace.name
    return birthPlace
  }

  protected processTitle(context: HtmlRR0SsgContext, data: RR0Data) {
    const doc = context.file.document
    if (!doc.title) {
      context.file.title = doc.title = data.title
    }
  }

  protected processURL(context: HtmlRR0SsgContext, data: RR0Data) {
    const doc = context.file.document
    const url = data.url
    if (url && !context.file.meta.url) {
      context.file.meta.url = url as unknown as string
    }
  }
}
