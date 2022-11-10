import {TimeContext} from "./time/TimeContext"
import {ssgMessages} from "./i18n"
import {RR0Messages} from "./i18n/RR0Messages"
import {FileInfo, HtmlSsgContext, SsgContext, SsgContextImpl} from "ssg-api"

export interface RR0SsgContext extends SsgContext {
  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(): RR0SsgContext
}

export interface HtmlRR0SsgContext extends HtmlSsgContext {
  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(): HtmlRR0SsgContext
}

export class RR0SsgContextImpl extends SsgContextImpl {

  readonly messages: RR0Messages

  constructor(locales: string | string[], readonly time: TimeContext,
              currentFile: FileInfo | undefined = undefined) {
    super(locales, currentFile)
    this.messages = ssgMessages[Array.isArray(locales) ? locales[0] : locales]
  }

  clone(): RR0SsgContextImpl {
    return new RR0SsgContextImpl(this.locales, this.time.clone(), this._inputFile)
  }
}
