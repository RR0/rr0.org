import {TimeContext} from "./time/TimeContext"
import {ssgMessages} from "./i18n"
import {RR0Messages} from "./i18n/RR0Messages"
import {HtmlSsgContext, SsgContext, SsgContextImpl, SsgFile} from "ssg-api"

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

  constructor(locale: string, readonly time: TimeContext,
              currentFile: SsgFile | undefined = undefined) {
    super(locale, currentFile)
    this.messages = ssgMessages[locale]
  }

  clone(): RR0SsgContextImpl {
    return new RR0SsgContextImpl(this.locale, this.time.clone(), this._inputFile)
  }
}
