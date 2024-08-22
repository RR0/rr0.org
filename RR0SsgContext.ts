import { TimeContext } from "./time/TimeContext"
import { ssgMessages } from "./lang"
import { RR0Messages } from "./lang/RR0Messages"
import { ConsoleLogger, FileContents, HtmlSsgContext, SsgConfig, SsgContext, SsgContextImpl } from "ssg-api"
import { People } from "./people/People"

export interface RR0SsgContext extends SsgContext {

  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(locale?: string): RR0SsgContext
}

export interface HtmlRR0SsgContext extends HtmlSsgContext {
  readonly messages: RR0Messages
  time: TimeContext
  people: People
  readonly images: Set<string>
  readonly config: SsgConfig

  clone(locale?: string): HtmlRR0SsgContext
}

export class RR0SsgContextImpl extends SsgContextImpl {

  readonly messages: RR0Messages
  readonly images = new Set<string>()
  protected readonly fileMap = new Map<string, FileContents>()

  constructor(locale: string, readonly time: TimeContext, readonly config: SsgConfig,
              readonly people = undefined, currentFile: FileContents | undefined = undefined) {
    super(locale, new Map(), "RR0", new ConsoleLogger("RR0"), currentFile)
    this.messages = ssgMessages[locale]
  }

  read(filePath: string): FileContents {
    let file = this.fileMap.get(filePath)
    if (file) {
      this.logger.debug("Reusing output file for", filePath)
      this.file = file
    } else {
      file = super.read(filePath)
      this.fileMap.set(filePath, file)
    }
    return file
  }

  clone(locale = this.locale): RR0SsgContextImpl {
    return new RR0SsgContextImpl(locale, this.time.clone(), this.config, this.people?.clone(), this._file)
  }
}
