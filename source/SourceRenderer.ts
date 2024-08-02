import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "./Source"
import { TimeContext } from "../time/TimeContext"
import { TimeReplacer } from "../time/TimeReplacer"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { TimeElementFactory } from "../time/TimeElementFactory"

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
      if ((source as Source).url) {   // Online source?
        const onlineSource = source as Source
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
      const pubItems = []
      const publisher = publication.publisher
      if (publisher) {
        const copyright = doc.createElement("i")
        copyright.textContent = publisher
        pubItems.push(copyright)
      }
      let timeValue = publication.time
      if (timeValue) {
        sourceContext.time.reset()
        if (timeValue instanceof TimeContext && timeValue.isDefined()) {
          Object.assign(sourceContext.time, timeValue)
        } else {
          TimeElementFactory.updateTimeFromStr(sourceContext.time, timeValue as unknown as string)
        }
        pubItems.push(TimeTextBuilder.build(sourceContext))
      }
      if (source.index) {
        pubItems.push(source.index)
      }
      for (const pubItem of pubItems) {
        container.append(", ", pubItem)
      }
    }
  }
}
