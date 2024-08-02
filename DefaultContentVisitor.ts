import { DataService } from "./DataService"
import { TimeElementFactory } from "./time/TimeElementFactory"
import { ContentVisitor } from "./RR0ContentStep"
import { HtmlRR0SsgContext } from "./RR0SsgContext"
import path from "path"
import { RR0Data } from "./RR0Data"
import { NamedPlace } from "./time/datasource/rr0/RR0CaseSummary"
import { EventRenderer } from "./time/EventRenderer"

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
        this.process(context, data)
      }
    }
  }

  protected process(context: HtmlRR0SsgContext, data: RR0Data) {
    this.processTitle(context, data)
    this.processURL(context, data)
    this.processBirth(context, data)
    this.processImage(context, data)
    this.processDeath(context, data)
    context.file.contents = context.file.serialize()
  }

  protected processImage(context: HtmlRR0SsgContext, data: RR0Data) {
    const doc = context.file.document
    const side = data.type === "people" ? "left" : "right"
    if (data.image && !doc.querySelector(`.contents > figure.${side}.side`)) {
      const parentEl = doc.querySelector(".contents")
      if (parentEl) {
        const imgEl = doc.createElement("img")
        imgEl.src = data.image
        imgEl.alt = data.title
        const figcaptionEl = doc.createElement("figcaption")
        figcaptionEl.textContent = data.name
        const figureEl = doc.createElement("figure")
        figureEl.classList.add(side, "side")
        figureEl.append(imgEl)
        figureEl.append(figcaptionEl)
        const insertEl = parentEl.querySelector("*")
        parentEl.insertBefore(figureEl, insertEl)
      }
    }
  }

  protected processBirth(context: HtmlRR0SsgContext, data: RR0Data) {
    const birthData = data.events?.find(data => data.type === "birth")
    if (birthData) {
      const doc = context.file.document
      const parentEl = doc.querySelector(".contents")
      if (parentEl) {
        const birthEl = doc.createElement("p")
        const name = data.surname ? "\"" + data.surname + "'" : data.name
        const birthContext = context.clone()
        const birthTimeStr = birthData.time as unknown as string
        const birthDateEl = this.timeElementFactory.create(birthContext, birthTimeStr, context)
        birthEl.append(name)
        birthEl.append(context.messages[data.type].birth(birthContext.time))
        birthEl.append(birthDateEl)
        if (birthData.place) {
          birthEl.append(" à ")
          const birthPlace = this.placeElement(context, birthData.place)
          birthEl.append(birthPlace)
        }
        this.eventRenderer.renderSources(context, birthData, birthEl)
        birthEl.append(".")
        const insertEl = parentEl.firstElementChild
        parentEl.insertBefore(birthEl, insertEl)
      } else {
        context.warn("no .content in " + context.file.name)
      }
    }
  }

  protected processDeath(context: HtmlRR0SsgContext, data: RR0Data) {
    const deathData = data.events?.find(data => data.type === "death")
    if (deathData) {
      const doc = context.file.document
      const deathEl = doc.createElement("p")
      const name = data.name
      const timeContext = context.clone()
      const timeStr = deathData.time as unknown as string
      const timeEl = this.timeElementFactory.create(timeContext, timeStr, context)
      deathEl.append(name)
      deathEl.append(context.messages[data.type].death(timeContext.time))
      deathEl.append(timeEl)
      if (deathData.place) {
        deathEl.append(" à ")
        const birthPlace = this.placeElement(context, deathData.place)
        deathEl.append(birthPlace)
      }
      this.eventRenderer.renderSources(context, deathData, deathEl)
      deathEl.append(".")
      const insertEl = doc.querySelector(".contents > p:last-of-type")
      insertEl.parentNode.append(deathEl)
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

  protected processURL(context: HtmlRR0SsgContext, people: RR0Data) {
    const doc = context.file.document
    if (people.url && !context.file.meta.url) {
      context.file.meta.url = people.url as unknown as string
    }
  }
}
