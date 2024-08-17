import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService"
import path from "path"
import { TimeContext } from "../time/TimeContext"

export class CaseAnchorHandler implements AnchorHandler {

  constructor(protected caseService: CaseService, protected timeTextBuilder: TimeTextBuilder) {
  }

  async handle(context: HtmlRR0SsgContext, link: HTMLAnchorElement, pathToSearch: string) {
    if (!link.title) {
      const aCase = (await this.caseService.get(pathToSearch))[0]
      if (aCase) {
        const caseContext = context.clone()
        caseContext.time.reset()
        const titles: string[] = []
        const caseTitle = aCase.title
        if (caseTitle && !titles.includes(caseTitle)) {
          titles.push(caseTitle)
        }
        const classification = aCase.classification
        const hynek = classification?.hynek
        if (hynek) {
          const classificationLabels = context.messages.case.classification.hynek[hynek]
          titles.push(classificationLabels.long)
        }
        const timeStr = aCase.time
        if (timeStr) {
          if (timeStr instanceof TimeContext) {
            caseContext.time = timeStr
          } else if (!titles.includes(timeStr)) {
            caseContext.time.updateFromStr(timeStr)
          }
          titles.push(this.timeTextBuilder.build(caseContext))
        }
        const place = aCase.place
        if (typeof place === "string" && !titles.includes(place)) {
          titles.push(place)
        }
        const conclusion = aCase.conclusion
        if (conclusion && !titles.includes(conclusion)) {
          link.classList.add(conclusion)
          titles.push(context.messages.case.conclusion[conclusion])
        }
        const image = (aCase as any).image
        if (image) {
          const doc = context.file.document
          const imgEl = doc.createElement("img")
          imgEl.src = path.join("/", image)
          imgEl.alt = aCase.title
          imgEl.className = "portrait"
          imgEl.loading = "lazy"
          imgEl.width = 75
          link.append(imgEl)
        }
        link.title = titles.join(", ")
      }
    }
  }
}
