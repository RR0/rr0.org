import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext"
import { TimeUrlBuilder } from "./TimeUrlBuilder"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { RelativeTimeTextBuilder } from "./RelativeTimeTextBuilder"
import { UrlUtil } from "../util/url/UrlUtil"
import { TimeReplacer } from "./TimeReplacer"

export interface TimeRenderOptions {
  url: boolean
}

export class TimeRenderer {

  constructor(readonly timeFiles: string[]) {
  }

  /**
   * Creates <time> elements from time contexts.
   */
  protected matchExistingTimeFile(url: string): string | undefined {
    while (url !== "time" && this.timeFiles.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === "time" ? undefined : url
  }

  render(context: HtmlRR0SsgContext, previousContext?: RR0SsgContext,
         options: TimeRenderOptions = {url: true}): HTMLElement {
    const absoluteTimeStr = TimeUrlBuilder.fromContext(context.time)
    const title = TimeTextBuilder.build(context)
    let text = previousContext ? RelativeTimeTextBuilder.build(previousContext, context) : undefined
    if (!text) {
      text = title
    }
    const file = context.file
    const currentFileName = file.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    const url = options.url && this.matchExistingTimeFile(absoluteTimeStr)
    const doc = file.document
    let replacement: HTMLElement | undefined
    const timeEl = TimeReplacer.resolvedTime(context, context.time.toString())
    if (title !== text) {
      timeEl.title = title
    }
    timeEl.textContent = text
    if (url && url !== dirName) {
      const a = replacement = doc.createElement("a") as HTMLAnchorElement
      a.href = UrlUtil.absolute(url)
      a.append(timeEl)
    } else {
      replacement = timeEl
    }
    return replacement
  }
}
