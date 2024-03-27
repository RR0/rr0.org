import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "../source/Source"
import { OnlineSource } from "../source/OnlineSource"
import { RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary"
import { TimeTextBuilder } from "./TimeTextBuilder"

export class RR0CaseRenderer {

  render(context: HtmlRR0SsgContext, rr0Case: RR0CaseSummary): HTMLLIElement {
    const outDoc = context.outputFile.document
    const item = outDoc.createElement("li")
    const time = rr0Case.dateTime
    const timeEl = outDoc.createElement("time") as HTMLTimeElement
    timeEl.dateTime = time.toString()
    const caseContext = context.clone()
    Object.assign(caseContext, {time})
    timeEl.textContent = TimeTextBuilder.build(caseContext)
    item.append(timeEl)
    const place = rr0Case.place
    if (place) {
      item.append(" À ")
      const placeEl = outDoc.createElement("span")
      placeEl.className = "place"
      placeEl.textContent = place?.name || ""
      item.append(placeEl)
    }
    item.append(", ", rr0Case.description)
    rr0Case.sources.forEach(source => {
      const sourceEl = this.thisSourceElement(context, source)
      item.append(" ", sourceEl)
    })
    item.append(".")
    return item
  }

  protected thisSourceElement(context: HtmlRR0SsgContext, source: Source) {
    const sourceEl = context.outputFile.document.createElement("span")
    sourceEl.className = "source"
    sourceEl.append(source.authors?.join(" & "), `: `)
    const doc = context.outputFile.document
    const title = source.title
    if (title) {
      if ((source as OnlineSource).url) {   // Online source?
        const onlineSource = source as OnlineSource
        const caseLink = doc.createElement("a") as HTMLAnchorElement
        caseLink.textContent = title
        caseLink.href = onlineSource.url.href
        sourceEl.appendChild(caseLink)
      } else {
        sourceEl.append(title)
      }
    }
    const publication = source.publication
    if (publication) {
      if (title) {
        sourceEl.append(", ")
      }
      const publisher = publication.publisher
      if (publisher) {
        const copyright = doc.createElement("i")
        copyright.textContent = publisher
        sourceEl.append(copyright)
      }
      let time = publication.time
      if (time) {
        if (publisher) {
          sourceEl.append(", ")
        }
        sourceEl.append(time.toString())
      }
    }
    return sourceEl
  }
}
