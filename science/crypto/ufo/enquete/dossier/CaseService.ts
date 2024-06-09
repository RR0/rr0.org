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
    return this.dataService.get<RR0Case>(path, [this.type, undefined], [this.type + ".json"])
  }

  getLink(context: HtmlRR0SsgContext, aCase: RR0Case): HTMLElement {
    const details: string[] = []
    const classList = ["data-resolved"]
    const classification = aCase.classification
    const hynek = classification?.hynek
    if (hynek) {
      const classificationLabels = context.messages.case.classification.hynek[hynek]
      details.push(classificationLabels.short)
    }
    const timeStr = aCase.time
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
    const text: (string | string[])[] = [aCase.title]
    if (details.length > 0) {
      text.push(`(${details.join(", ")})`)
    }
    const doc = context.file.document
    const link = doc.createElement("a")
    link.innerHTML = text.join(" ")
    link.href = path.join("/", aCase.dirName)
    const span = doc.createElement("span")
    if (classList.length > 0) {
      span.classList.add(...classList)
    }
    span.append(link)
    return span
  }
}
