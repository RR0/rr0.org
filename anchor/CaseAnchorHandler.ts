import { AnchorHandler } from "./AnchorHandler"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { TimeReplacer } from "../time/TimeReplacer"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { DataService } from "../DataService"
import { RR0Case } from "../science/crypto/ufo/enquete/dossier/RR0Case"

export class CaseAnchorHandler implements AnchorHandler {

  constructor(protected caseService: DataService) {
  }

  async handle(context: HtmlRR0SsgContext, a: HTMLAnchorElement, pathToSearch: string) {
    if (this.caseService.dirs.find(dir => dir.startsWith(pathToSearch))) {
      if (!a.title) {
        const cases = await this.caseService.get<RR0Case>(context, pathToSearch, ["case"], ["case.json"])
        for (const aCase of cases) {
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
