import { TimeContext } from "./TimeContext.js"

export class TimeUrlBuilder {

  static readonly root = "time/"

  static fromContext(time: TimeContext) {
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
