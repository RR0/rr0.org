import { DataService } from "./data/DataService"
import { TimeElementFactory } from "./time/TimeElementFactory"
import { ContentVisitor } from "./RR0ContentStep"
import { HtmlRR0SsgContext } from "./RR0SsgContext"
import path from "path"
import { RR0Data } from "./data/RR0Data"
import { EventRenderer } from "./time/EventRenderer"
import { People } from "./people/People"
import { RR0Event } from "./event/RR0Event"
import assert from "assert"

export class DefaultContentVisitor implements ContentVisitor {

  constructor(protected service: DataService, protected eventRenderer: EventRenderer<RR0Data>,
              protected timeElementFactory: TimeElementFactory) {
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
          const {eventP, timeEl} = this.timeParagraph(context, event)
          await this.eventRenderer.renderContent(context, event, eventP)
          doc.append(eventP)
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


  protected timeParagraph(context: HtmlRR0SsgContext, event: RR0Data) {
    const eventP = context.file.document.createElement("p")
    const eventContext = context.clone()
    const eventTime = event.time
    assert.ok(eventTime, `Event of type "${event.type}" has no time`)
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

  protected async processImage(context: HtmlRR0SsgContext, imageData: RR0Data) {
    const doc = context.file.document
    const contents = doc.querySelector(".contents")
    if (contents) {
      const side = context.people ? "left" : "right"
      const imgEl = contents.querySelector("img")
      const caption = imageData.name
      const src = imageData.url
      if (imgEl?.src !== src) {
        const imgEl = doc.createElement("img")
        imgEl.src = src
        imgEl.alt = imageData.title
        const figcaptionEl = doc.createElement("figcaption")
        figcaptionEl.innerHTML = caption
        await this.eventRenderer.renderEnd(context, imageData, figcaptionEl)

        const figureEl = doc.createElement("figure")
        figureEl.classList.add(side, "side")
        figureEl.append(imgEl)
        figureEl.append(figcaptionEl)

        const insertEl = contents.querySelector("*")
        contents.insertBefore(figureEl, insertEl)
      }
    }
  }

  protected async processBirth(context: HtmlRR0SsgContext, event: RR0Data, entity: RR0Data) {
    const parentEl = context.file.document.querySelector(".contents")
    if (parentEl) {
      const {eventP, timeEl} = this.timeParagraph(context, event)
      const name = entity.surname ? `"${entity.surname}"` : entity.name || entity.title
      eventP.append(name)
      eventP.append(context.messages[entity.type].birth)
      eventP.append(timeEl)
      if (event.place) {
        eventP.append(" à ")
        eventP.append(this.eventRenderer.placeElement(context, event.place))
      }
      await this.eventRenderer.renderEnd(context, event, eventP)

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
      const birthPlace = this.eventRenderer.placeElement(context, event.place)
      eventP.append(birthPlace)
    }
    await this.eventRenderer.renderEnd(context, event, eventP)

    const insertEl = context.file.document.querySelector(".contents > p:last-of-type")
    if (insertEl) {
      insertEl.parentNode.append(eventP)
    }
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
      await this.eventRenderer.renderEnd(context, bookData, bookEl)

      parentEl.append(bookEl)
    } else {
      context.warn("no .content in " + context.file.name)
    }
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
