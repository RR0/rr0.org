import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Source } from "./Source"
import { TimeContext } from "../time/TimeContext"
import { TimeTextBuilder } from "../time/TimeTextBuilder"

/**
 * Render a case summary for a RR0 web page.
 */
export class SourceRenderer {

  constructor(readonly timeTextBuilder: TimeTextBuilder) {
  }

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
        container.append(sep, peopleTag)
        sep = " & "   // Will be escaped as &amp;
      }
      container.append(` : `)
    }
    const pubItems: (HTMLElement | string)[] = []
    const title = source.title
    if (title) {
      if (source.url) {   // Online source?
        const sourceLink = doc.createElement("a") as HTMLAnchorElement
        sourceLink.innerHTML = title
        sourceLink.href = source.url
        pubItems.push(sourceLink)
      } else {
        pubItems.push(title)
      }
    }
    const publication = source.publication
    if (publication) {
      const publisher = publication.publisher
      if (publisher) {
        const copyright = doc.createElement("i")
        copyright.textContent = publisher
        pubItems.push(copyright)
      }
      let timeValue = publication.time
      if (timeValue) {
        sourceContext.time.reset()
        if (timeValue instanceof TimeContext) {
          if (timeValue.isDefined()) {
            Object.assign(sourceContext.time, timeValue)
          }
        } else {
          sourceContext.time.updateFromStr(timeValue as unknown as string)
        }
        pubItems.push(this.timeTextBuilder.build(sourceContext))
      }
      if (source.index) {
        pubItems.push(source.index.toString())
      }
    }
    let sep = ""
    for (const pubItem of pubItems) {
      container.append(sep, pubItem)
      sep = ", "
    }
  }
}
