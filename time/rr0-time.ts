import {CommonService, Context, SelectorDirective} from "../src/common"
import {TimeService} from "./time"
import {NetService} from "../src/net"
import {Moment} from "./Moment"
import {Duration} from "./Duration"

global.fetch = require("node-fetch")

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
      const durMax = new Duration()
      durationMax = durMax.fromString(maxString).toString()
      const durationMin = new Duration().fromString(dataStr).toString(durMax.unit.name)
      durationStr = `${durationMin} \xE0 ${durationMax}`
    } else {
      durationStr = new Duration().fromString(dataStr).toString()
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

  async handleTime(el: HTMLElement, dataStr: string, dateTime: string, contextTime: Moment, txt: string) {
    const decodedTime = new Moment(this.commonsService)
    decodedTime.year = contextTime.getYear()
    decodedTime.month = contextTime.getMonth()
    decodedTime.dayOfMonth = contextTime.getDayOfMonth()
    decodedTime.hour = contextTime.getHour()
    decodedTime.minutes = contextTime.getMinutes()
    decodedTime.seconds = contextTime.getSeconds()

    decodedTime.fromString(dataStr)
    const r = this.timeService.toLink(contextTime, decodedTime)
    const previousSibling = el.previousSibling
    if (r.replacement && (!previousSibling || previousSibling.textContent.trim().length === 0)) {
      r.replacement = this.commonsService.capitalizeFirstLetter(r.replacement)
    }
    dataStr = this.timeService.toISOString(decodedTime)
    if (!dateTime) {
      el.setAttribute("datetime", dataStr)
    }
    await this.netService.checkedLink(el, txt, r.timeLink, r.replacement, false, r.title)
  }

  protected async handle(context: Context, el: HTMLElement) {
    const txt = el.innerText || el.innerHTML
    const dateTime = el.getAttribute("datetime")
    if (txt.charAt(0) === 'P') {
      this.handleDuration(el, txt, dateTime)
    } else {
      let dataStr = dateTime ? dateTime : txt
      return this.handleTime(el, dataStr, dateTime, context.time, txt)
    }
  }
}
