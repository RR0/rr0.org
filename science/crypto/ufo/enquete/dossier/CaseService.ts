import { DataService, RR0DataFactory } from "../../../../../DataService"
import { RR0Case } from "./RR0Case"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../RR0SsgContext"
import path from "path"
import { TimeReplacer } from "../../../../../time/TimeReplacer"

export class CaseService {

  constructor(protected dataService: DataService, protected readonly timeReplacer: TimeReplacer,
              readonly type = "case") {
  }

  get factory(): RR0DataFactory<RR0Case> {
    return this.dataService.factories.find(factory => factory.type === this.type) as RR0DataFactory<RR0Case>
  }

  async get(context: RR0SsgContext, path: string): Promise<RR0Case[] | undefined> {
    return this.dataService.get<RR0Case>(context, path, [this.type, undefined], [this.type + ".json"])
  }

  getLink(context: HtmlRR0SsgContext, dirCase: RR0Case): HTMLElement {
    const doc = context.file.document
    const titles: string[] = []
    const details: string[] = []
    const classList = ["data-resolved"]
    const classification = dirCase.classification
    const hynek = classification?.hynek
    if (hynek) {
      const classificationLabels = context.messages.case.classification.hynek[hynek]
      details.push(classificationLabels.short)
      titles.push(classificationLabels.long)
    }
    const timeStr = dirCase.time
    const caseContext = context.clone()
    if (timeStr) {
      const options = caseContext.time.options
      options.month = undefined
      options.day = undefined
      options.hour = undefined
      options.weekday = undefined
      options.minute = undefined
      const elem = this.timeReplacer.create(caseContext, timeStr, undefined, {url: false})
      details.push(elem.outerHTML)
    }
    const text: (string | string[])[] = [dirCase.title]
    if (details.length > 0) {
      text.push(`(${details.join(", ")})`)
    }
    const link = doc.createElement("a")
    link.innerHTML = text.join(" ")
    link.href = path.join("/", dirCase.dirName)
    const span = doc.createElement("span")
    if (titles.length > 0) {
      span.title = titles.join(", ")
    }
    if (classList.length > 0) {
      span.classList.add(...classList)
    }
    const image = (dirCase as any).image
    if (image) {
      const imgEl = doc.createElement("img")
      imgEl.src = path.join("/", image)
      imgEl.alt = dirCase.title
      imgEl.className = "portrait"
      imgEl.loading = "lazy"
      imgEl.width = 75
      link.append(imgEl)
    }
    span.append(link)
    return span
  }
}
