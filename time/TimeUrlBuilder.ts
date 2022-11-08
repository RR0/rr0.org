import {RR0SsgContext} from "../RR0SsgContext"

export class TimeUrlBuilder {

  static build(context: RR0SsgContext): string {
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
