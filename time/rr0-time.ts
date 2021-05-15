import {CommonService, Context, SelectorDirective} from "../src/common"
import time, {Moment, TimeService} from "./time"
import {NetService} from "../src/net"

export class TimeDirective extends SelectorDirective {

  constructor(private commonsService: CommonService, private netService: NetService, private timeService: TimeService) {
    super("time")
  }

  handleDuration(el: HTMLElement, dataStr: string, dateTime: string) {
    let durationStr
    let durationMax
    const slashPos = dataStr.indexOf('/')
    if (slashPos > 0) {
      let maxString = dataStr.substring(slashPos + 1)
      if (maxString.charAt(0) !== 'P') {
        maxString = 'P' + maxString
      }
      const durMax = this.timeService.NewDuration()
      durationMax = durMax.fromString(maxString).toString()
      const durationMin = this.timeService.NewDuration().fromString(dataStr).toString(durMax.unit.name)
      durationStr = durationMin + " \xE0 " + durationMax
    } else {
      durationStr = this.timeService.NewDuration().fromString(dataStr).toString()
    }
    const r = {
      replacement: durationStr
    }
    if (!dateTime) {
      el.setAttribute("datetime", dataStr)
    }
    el.innerHTML = r.replacement
    el.classList.add('duration')
  }

  async handleTime(el: HTMLElement, dataStr: string, dateTime: string, decodedTime: Moment, currentTime: Moment, txt: string) {
    decodedTime.fromString(dataStr)
    const r = this.timeService.toString(currentTime, decodedTime)
    const previousSibling = el.previousSibling
    if (r.replacement && (!previousSibling || previousSibling.textContent.trim().length === 0)) {
      r.replacement = this.commonsService.capitalizeFirstLetter(r.replacement)
    }
    dataStr = this.timeService.toISOString(decodedTime)
    await this.netService.checkedLink(el, txt, r.timeLink, r.replacement, false, r.title)
    if (!dateTime) {
      el.setAttribute("datetime", dataStr)
    }
  }

  protected async handle(context: Context, el: HTMLElement) {
    const txt = el.innerText || el.innerHTML

    const currentTime = context.time

    const decodedTime = this.timeService.NewMoment()
    decodedTime.year = currentTime.getYear()
    decodedTime.month = currentTime.getMonth()
    decodedTime.dayOfMonth = currentTime.getDayOfMonth()
    decodedTime.hour = currentTime.getHour()
    decodedTime.minutes = currentTime.getMinutes()
    decodedTime.seconds = currentTime.getSeconds()

    const dateTime = el.getAttribute("datetime")
    let dataStr = dateTime ? dateTime : txt

    if (dataStr.charAt(0) === 'P') {
      this.handleDuration(el, dataStr, dateTime)
    } else {
      await this.handleTime(el, dataStr, dateTime, decodedTime, currentTime, txt)
    }
  }
}
