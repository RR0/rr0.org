import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "../source/Source"
import { OnlineSource } from "../source/OnlineSource"
import { RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary"
import { TimeTextBuilder } from "./TimeTextBuilder"

export class RR0CaseRenderer {

  render(context: HtmlRR0SsgContext, rr0Case: RR0CaseSummary): HTMLLIElement {
    const outDoc = context.outputFile.document
    const item = outDoc.createElement("li")
    const time = rr0Case.time
    const timeEl = outDoc.createElement("time") as HTMLTimeElement
    timeEl.dateTime = time.toString()
    const caseContext = context.clone()
    Object.assign(caseContext, {time})
    timeEl.textContent = TimeTextBuilder.build(caseContext)
    item.append(timeEl)
    item.append(" À ")
    const placeEl = outDoc.createElement("span")
    placeEl.className = "place"
    placeEl.textContent = rr0Case.place?.name || ""
    item.append(placeEl, ", ", rr0Case.description)
    rr0Case.sources.forEach(source => {
      const sourceEl = this.thisSourceElement(context, source)
      item.append(" ", sourceEl)
    })
    return item
  }

  protected thisSourceElement(context: HtmlRR0SsgContext, source: Source) {
    const sourceEl = context.outputFile.document.createElement("span")
    sourceEl.className = "source"
    sourceEl.innerHTML = source.authors?.join(" & ") + `: `
    const doc = context.outputFile.document
    if (source instanceof OnlineSource) {
      const onlineSource = source as OnlineSource
      const caseLink = doc.createElement("a") as HTMLAnchorElement
      caseLink.textContent = source.title
      caseLink.href = onlineSource.url.href
      sourceEl.appendChild(caseLink)
    } else {
      sourceEl.textContent = source.title
    }
    const copyright = doc.createElement("i")
    const publication = source.publication
    if (publication) {
      copyright.textContent = publication.publisher
      sourceEl.append(", ", copyright, ", ", publication.time)
    }
    return sourceEl
  }
}
