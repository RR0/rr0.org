import { AllDataService } from "../../../../../data/AllDataService"
import { RR0Case } from "./RR0Case"
import { HtmlRR0SsgContext } from "../../../../../RR0SsgContext"
import path from "path"
import { TimeElementFactory } from "../../../../../time/TimeElementFactory"
import { AbstractDataService } from "../../../../../data/AbstractDataService"
import { CaseFactory } from "./CaseFactory"

export class CaseService extends AbstractDataService<RR0Case> {

  constructor(dataService: AllDataService, factory: CaseFactory,
              protected readonly timeElementFactory: TimeElementFactory) {
    super(dataService, factory)
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
