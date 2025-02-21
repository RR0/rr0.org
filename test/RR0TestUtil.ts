import path from "path"
import { FileWriteConfig, HtmlFileContents, SsgContext } from "ssg-api"
import { HtmlRR0Context, RR0Context, RR0ContextImpl, TimeService } from "@rr0/cms"
import { FileContents } from "@javarome/fileutil"
import { TimeContext } from "@rr0/time"

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

  readonly config: FileWriteConfig
  timeService: TimeService

  constructor(readonly rootDir = "test", readonly outDir = "out") {
    this.config = {
      getOutputPath(context: SsgContext): string {
        return path.join(this.outDir, context.file.name)
      }
    }
  }

  newContext(inputFileName: string, contents?: string): RR0Context {
    const context = new RR0ContextImpl("fr", new TimeContext(), this.config)
    if (contents !== undefined && contents != null) {
      const langInfo = FileContents.getLang(inputFileName)
      context.file = new FileContents(inputFileName, "utf8", contents, new Date(), langInfo)
    } else {
      context.file = FileContents.read(inputFileName)
    }
    context.file = context.file  // By default
    return context
  }

  newHtmlContext(inputFileName: string, contents?: string): HtmlRR0Context {
    const context = this.newContext(inputFileName, contents)
    const titleExec = /<title>(.*)<\/title>/.exec(contents)
    const title = titleExec && titleExec.length > 0 ? titleExec[1].trim() : undefined
    const currentFile = context.file
    context.file = new HtmlFileContents(currentFile.name, currentFile.encoding, currentFile.contents,
      currentFile.lastModified, currentFile.lang, {author: []}, {}, title)
    const htmlContext = context as HtmlRR0Context
    const timeContext = this.timeService.contextFromFileName(htmlContext, inputFileName)
    Object.assign(htmlContext.time, timeContext)
    return htmlContext
  }
}

export const rr0TestUtil = new RR0TestUtil()

export function testFilePath(filePath: string) {
  return path.join(rr0TestUtil.rootDir, filePath)
}
