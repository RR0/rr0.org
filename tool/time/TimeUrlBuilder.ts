import {SsgContext} from "../SsgContext"

export class TimeUrlBuilder {

  static build(context: SsgContext): string {
    let url = "time/"
    let time = context.time
    const year = time.year
    if (year) {
      url += year.toString().split("").join("/")
    }
    let month = time.month
    if (month) {
      url += "/" + month.toString().padStart(2, "0")
    }
    let day = time.dayOfMonth
    if (day) {
      url += "/" + day.toString().padStart(2, "0")
    }
    return url
  }
}
