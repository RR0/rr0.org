import {SsgContext, SsgContextImpl} from "../SsgContext"
import {TimeContext} from "../step/content/replace/html/time/TimeContext"
import {HtmlFileInfo} from "../util/file/HtmlFileInfo"
import {HtmlSsgContext} from "../HtmlSsgContext"

class TestUtil {

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  newContext(name: string, contents: string): SsgContext {
    const context = new SsgContextImpl("fr", new TimeContext(this.intlOptions))
    context.currentFile = {
      contents,
      encoding: "utf8",
      lastModified: new Date(),
      name,
      lang: "fr"
    }
    return context
  }

  newHtmlContext(name: string, contents: string): HtmlSsgContext {
    const context = this.newContext(name, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : name
    context.currentFile = {...context.currentFile, title} as HtmlFileInfo
    return context as HtmlSsgContext
  }
}

export const testUtil = new TestUtil()
