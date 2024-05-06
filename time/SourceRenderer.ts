import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "../source/Source"
import { OnlineSource } from "../source/OnlineSource"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { TimeReplacer } from "./TimeReplacer"

/**
 * Render a case summary for a RR0 web page.
 */
export class SourceRenderer {

  render(context: HtmlRR0SsgContext, source: Source): HTMLElement {
    const sourceEl = context.outputFile.document.createElement("span")
    sourceEl.className = "source"
    this.renderContent(context, source, sourceEl)
    return sourceEl
  }

  renderContent(context: HtmlRR0SsgContext, source: Source, container: HTMLElement): void {
    const doc = context.outputFile.document
    const sourceContext = context.clone()
    container.append(source.authors?.join(" & "), `: `)
    const title = source.title
    if (title) {
      if ((source as OnlineSource).url) {   // Online source?
        const onlineSource = source as OnlineSource
        const caseLink = doc.createElement("a") as HTMLAnchorElement
        caseLink.textContent = title
        const url = onlineSource.url
        caseLink.href = url instanceof URL ? url.href : url
        container.appendChild(caseLink)
      } else {
        container.append(title)
      }
    }
    const publication = source.publication
    if (publication) {
      if (title) {
        container.append(", ")
      }
      const publisher = publication.publisher
      if (publisher) {
        const copyright = doc.createElement("i")
        copyright.textContent = publisher
        container.append(copyright)
      }
      let timeValue = publication.time
      if (timeValue) {
        sourceContext.time.reset()
        if (publisher) {
          container.append(", ")
        }
        if (typeof timeValue === "string") {
          TimeReplacer.updateTimeFromStr(sourceContext.time, timeValue)
        } else {
          Object.assign(sourceContext.time, timeValue)
        }
        container.append(TimeTextBuilder.build(sourceContext))
      }
    }
  }
}
