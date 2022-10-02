import {TimeContext} from "./time/TimeContext"
import {SsgMessages} from "./i18n/SsgMessages"
import {ssgMessages} from "./i18n"
import {FileInfo} from "./util/file/FileUtil"

export class SsgContext {

  readonly messages: SsgMessages
  readonly log = process.env.LOG_LEVEL === "none" ? () => {
  } : console.log
  readonly debug = process.env.LOG_LEVEL === "debug" ? console.debug : () => {
  }
  currentFile?: FileInfo

  constructor(readonly locales: string | string[], readonly time: TimeContext) {
    this.messages = ssgMessages[Array.isArray(locales) ? locales[0] : locales]
  }

  clone(): SsgContext {
    return new SsgContext(this.locales, this.time.clone())
  }
}
