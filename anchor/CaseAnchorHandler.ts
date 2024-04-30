import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeReplacer } from "../time/TimeReplacer"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { DataService } from "../DataService"
import { Case } from "../science/crypto/ufo/enquete/dossier/Case"

export class CaseAnchorHandler implements AnchorHandler {

  constructor(protected caseService: DataService<Case>) {
  }

  handle(context: HtmlRR0SsgContext, a: HTMLAnchorElement, pathToSearch: string) {
    if (this.caseService.dirs.find(dir => dir.startsWith(pathToSearch))) {
      const aCase = this.caseService.read(context, pathToSearch)
      if (aCase) {
        if (!a.title) {
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
          if (place && !titleElems.includes(place)) {
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
}
