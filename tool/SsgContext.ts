import {TimeContext} from "./time/TimeContext"
import {SsgMessages} from "./i18n/SsgMessages"
import {ssgMessages} from "./i18n"

export class SsgContext {

  readonly messages: SsgMessages

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
