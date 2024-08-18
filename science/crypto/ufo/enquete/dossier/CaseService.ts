import { DataService } from "../../../../../data/DataService"
import { RR0Case } from "./RR0Case"
import { HtmlRR0SsgContext } from "../../../../../RR0SsgContext"
import path from "path"
import { TimeElementFactory } from "../../../../../time/TimeElementFactory"
import { RR0DataFactory } from "../../../../../data/RR0DataFactory"

export class CaseService {

  constructor(protected dataService: DataService, protected readonly timeElementFactory: TimeElementFactory,
              readonly type = "case") {
  }

  get factory(): RR0DataFactory<RR0Case> {
    return this.dataService.factories.find(factory => factory.type === this.type) as RR0DataFactory<RR0Case>
  }

  async get(path: string): Promise<RR0Case[] | undefined> {
    return this.dataService.getFromDir<RR0Case>(path, [this.type, undefined], [this.type + ".json"])
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
    const time = aCase.time
    const caseContext = context.clone()
    if (time) {
      caseContext.time = time
      const options: Intl.DateTimeFormatOptions = {year: "numeric"}
      const {result, replacement} = this.timeElementFactory.renderer.renderContent(caseContext, undefined, {url: true},
        options)
      result.append(replacement)
      details.push(result.outerHTML)
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
