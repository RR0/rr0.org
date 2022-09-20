import {SsgContext} from "../SsgContext"
import {TimeContext} from "../time/TimeContext"

class TestUtil {
  readonly intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  newContext(name: string, contents: string) {
    const context = new SsgContext("fr", new TimeContext(this.intlOptions))
    context.currentFile = {
      contents,
      encoding: "utf8",
      lastModified: new Date(),
      name
    }
    return context
  }
}

export const testUtil = new TestUtil()
