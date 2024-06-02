import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeReplacer } from "../time/TimeReplacer"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService"

export class CaseAnchorHandler implements AnchorHandler {

  constructor(protected caseService: CaseService) {
  }

  async handle(context: HtmlRR0SsgContext, a: HTMLAnchorElement, pathToSearch: string) {
    if (!a.title) {
      const aCase = (await this.caseService.get(context, pathToSearch))[0]
      if (aCase) {
        const titleElems: string[] = []
        const caseContext = context.clone()
        caseContext.time.reset()
        const caseTitle = aCase.title
        if (caseTitle && !titleElems.includes(caseTitle)) {
          titleElems.push(caseTitle)
        }
        const time = aCase.time
        if (time && !titleElems.includes(time)) {
          TimeReplacer.updateTimeFromStr(caseContext.time, time)
          titleElems.push(TimeTextBuilder.build(caseContext))
        }
        const place = aCase.place
        if (typeof place === "string" && !titleElems.includes(place)) {
          titleElems.push(place)
        }
        const conclusion = aCase.conclusion
        if (conclusion && !titleElems.includes(conclusion)) {
          a.classList.add(conclusion)
          titleElems.push(context.messages.case.conclusion[conclusion])
        }
        a.title = titleElems.join(", ")
      }
    }
  }
}
