import {TimeContext} from "./time/TimeContext"
import {ssgMessages} from "./lang"
import {RR0Messages} from "./lang/RR0Messages"
import {HtmlSsgContext, SsgContext, SsgContextImpl, SsgFile} from "ssg-api"
import {DefaultLogger} from "ssg-api/dist/src/DefaultLogger"

export interface RR0SsgContext extends SsgContext {
  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(): RR0SsgContext
}

export interface HtmlRR0SsgContext extends HtmlSsgContext {
  readonly messages: RR0Messages
  readonly time: TimeContext
  readonly images: Set<string>

  clone(): HtmlRR0SsgContext
}

export class RR0SsgContextImpl extends SsgContextImpl {

  readonly messages: RR0Messages
  readonly images = new Set<string>()

  constructor(locale: string, readonly time: TimeContext,
              currentFile: SsgFile | undefined = undefined) {
    super(locale, new Map(), "RR0", new DefaultLogger("RR0"), currentFile)
    this.messages = ssgMessages[locale]
  }

  clone(): RR0SsgContextImpl {
    return new RR0SsgContextImpl(this.locale, this.time.clone(), this._inputFile)
  }
}
