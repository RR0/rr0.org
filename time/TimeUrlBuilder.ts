import {SsgContext} from "../tool/SsgContext"

export class TimeUrlBuilder {

  static build(context: SsgContext): string {
    let url = "time/"
    let time = context.time
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
