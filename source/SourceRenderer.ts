import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "./Source"
import { OnlineSource } from "./OnlineSource"
import { TimeContext } from "../time/TimeContext"
import { TimeReplacer } from "../time/TimeReplacer"
import { TimeTextBuilder } from "../time/TimeTextBuilder"

/**
 * Render a case summary for a RR0 web page.
 */
export class SourceRenderer {

  render(context: HtmlRR0SsgContext, source: Source): HTMLElement {
    const sourceEl = context.file.document.createElement("span")
    sourceEl.className = "source"
    this.renderContent(context, source, sourceEl)
    return sourceEl
  }

  renderContent(context: HtmlRR0SsgContext, source: Source, container: HTMLElement): void {
    const doc = context.file.document
    const sourceContext = context.clone()
    const authors = source.authors
    if (authors?.length > 0) {
      let sep: string = ""
      for (const author of authors) {
        const peopleTag = doc.createElement("span")
        peopleTag.className = "people"
        peopleTag.textContent = author
        container.append(peopleTag, sep)
        sep = " & "
      }
      container.append(` : `)
    }
    const title = source.title
    if (title) {
      if ((source as OnlineSource).url) {   // Online source?
        const onlineSource = source as OnlineSource
        const sourceLink = doc.createElement("a") as HTMLAnchorElement
        sourceLink.textContent = title
        const url = onlineSource.url
        sourceLink.href = url instanceof URL ? url.href : url
        container.appendChild(sourceLink)
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
        if (timeValue instanceof TimeContext) {
          Object.assign(sourceContext.time, timeValue)
        } else {
          TimeReplacer.updateTimeFromStr(sourceContext.time, timeValue)
        }
        container.append(TimeTextBuilder.build(sourceContext))
      }
      if (source.index) {
        container.append(", " + source.index)
      }
    }
  }
}
