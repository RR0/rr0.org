import {RR0SsgContext} from "../RR0SsgContext"
import {TimeContext} from "./TimeContext"

export class TimeUrlBuilder {

  static readonly root = "time/"

  static fromContext(context: RR0SsgContext): string {
    let time = context.time
    return this.fromTimeContext(time)
  }

  static fromTimeContext(time: TimeContext) {
    let url = this.root
    const year = time.getYear()
    if (year) {
      url += year.toString().split("").join("/")
    }
    let month = time.getMonth()
    if (month) {
      url += "/" + month.toString().padStart(2, "0")
    }
    let day = time.getDayOfMonth()
    if (day) {
      url += "/" + day.toString().padStart(2, "0")
    }
    return url
  }
}
