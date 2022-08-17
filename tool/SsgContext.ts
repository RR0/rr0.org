import {TimeContext} from "./time/TimeContext"
import {SsgMessages} from "./i18n/SsgMessages"
import {ssgMessages} from "./i18n"
import {FileInfo} from "./FileUtil"

export class SsgContext {

  readonly messages: SsgMessages
  readonly log = process.env.LOG_LEVEL === "none" ? () => {
  } : console.log
  readonly debug = process.env.LOG_LEVEL === "debug" ? console.debug : () => {
  }
  fileInfo?: FileInfo

  constructor(
    readonly locales: string | string[] = "fr",
    readonly options: Intl.DateTimeFormatOptions,
    readonly time: TimeContext = new TimeContext()) {
    this.messages = ssgMessages[Array.isArray(locales) ? locales[0] : locales]
  }

  clone(): SsgContext {
    return new SsgContext(this.locales, {...this.options}, this.time.clone())
  }

  static merge(oldContext: SsgContext, deltaContext: SsgContext) {
    return new SsgContext(deltaContext.locales, deltaContext.options, TimeContext.merge(oldContext.time, deltaContext.time))
  }
}
