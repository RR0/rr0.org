import {SsgContext} from "../SsgContext"
import {TimeContext} from "../step/content/replace/html/time/TimeContext"
import {HtmlFileInfo} from "../util/file/HtmlFileInfo"
import {HtmlSsgContext} from "../HtmlSsgContext"
import {FileInfo} from "../util/file/FileInfo"
import {SsgContextImpl} from "../SsgContextImpl"

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

  newContext(inputFileName: string, contents: string): SsgContext {
    const context = new SsgContextImpl("fr", new TimeContext(this.intlOptions))
    context.inputFile = new FileInfo(inputFileName, "utf8", contents, new Date(), "fr")
    return context
  }

  newHtmlContext(inputFileName: string, contents: string): HtmlSsgContext {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : inputFileName
    const currentFile = context.inputFile
    context.inputFile = new HtmlFileInfo(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang, title)
    return context as HtmlSsgContext
  }
}

export const testUtil = new TestUtil()
