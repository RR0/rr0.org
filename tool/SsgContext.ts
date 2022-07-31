import {TimeContext} from "./TimeContext"
import {SsgMessages, ssgMessages} from "./i18n/SsgMessages"

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
}
