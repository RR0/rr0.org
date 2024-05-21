import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext"
import { TimeUrlBuilder } from "./TimeUrlBuilder"
import { TimeTextBuilder } from "./TimeTextBuilder"
import { RelativeTimeTextBuilder } from "./RelativeTimeTextBuilder"
import { UrlUtil } from "../util/url/UrlUtil"

export class TimeRenderer {

  protected matchExistingTimeFile(url: string, timeFiles: string[]): string | undefined {
    while (url !== "time" && timeFiles.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === "time" ? undefined : url
  }

  render(context: HtmlRR0SsgContext, timeFiles: string[], previousContext?: RR0SsgContext): HTMLElement {
    const absoluteTimeStr = TimeUrlBuilder.fromContext(context.time)
    const title = TimeTextBuilder.build(context)
    let text = previousContext ? RelativeTimeTextBuilder.build(previousContext, context) : undefined
    if (!text) {
      text = title
    }
    const file = context.file
    const currentFileName = file.name
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    const url = this.matchExistingTimeFile(absoluteTimeStr, timeFiles)
    const doc = file.document
    let replacement: HTMLElement | undefined
    if (url && url !== dirName) {
      const a = replacement = doc.createElement("a") as HTMLAnchorElement
      a.href = UrlUtil.absolute(url)
    } else {
      replacement = doc.createElement("time")
    }
    if (text != title) {
      replacement.title = title
    }
    replacement.textContent = text
    return replacement
  }
}
