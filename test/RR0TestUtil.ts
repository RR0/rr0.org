import { HtmlRR0SsgContext, RR0SsgContext, RR0SsgContextImpl } from "../RR0SsgContext"
import { TimeContext } from "../time/TimeContext"
import { FileContents, HtmlFileContents } from "ssg-api"

class RR0TestUtil {

  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  newContext(inputFileName: string, contents?: string): RR0SsgContext {
    const context = new RR0SsgContextImpl("fr", new TimeContext(), {outDir: "out"})
    if (contents !== undefined && contents != null) {
      const langInfo = FileContents.getLang(inputFileName)
      context.file = new FileContents(inputFileName, "utf8", contents, new Date(), langInfo)
    } else {
      context.file = FileContents.read(inputFileName)
    }
    context.file = context.file  // By default
    return context
  }

  newHtmlContext(inputFileName: string, contents?: string): HtmlRR0SsgContext {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.file
    context.file = new HtmlFileContents(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang, {author: []}, {}, title)
    const htmlContext = context as HtmlRR0SsgContext
    Object.assign(htmlContext.time, TimeContext.fromFileName(htmlContext, inputFileName))
    return htmlContext
  }
}

export const rr0TestUtil = new RR0TestUtil()
