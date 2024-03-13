import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { Source } from "../source/Source"
import { OnlineSource } from "../source/OnlineSource"

export class RR0CaseRenderer {

  protected thisSourceElement(context: HtmlRR0SsgContext, source: Source) {
    const sourceEl = context.outputFile.document.createElement("span")
    sourceEl.className = "source"
    sourceEl.innerHTML = source.authors.join(" & ") + `: `
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
    copyright.textContent = source.publication.publisher
    sourceEl.append(", ", copyright, ", ", source.publication.time)
    return sourceEl
  }

  render(context: HtmlRR0SsgContext, rr0Case: RR0CaseSummary): HTMLLIElement {
    const outDoc = context.outputFile.document
    const item = outDoc.createElement("li")
    const timeEl = outDoc.createElement("time")
    timeEl.textContent = rr0Case.time.toString()
    item.append(timeEl)
    item.append(" À ")
    const placeEl = outDoc.createElement("span")
    placeEl.className = "place"
    placeEl.textContent = rr0Case.place.name
    item.append(placeEl, ", ", rr0Case.description)
    rr0Case.sources.forEach(source => {
      const sourceEl = this.thisSourceElement(context, source)
      item.append(" ", sourceEl)
    })
    return item
  }
}
