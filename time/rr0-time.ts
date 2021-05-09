import {CommonService, SelectorDirective} from "../src/common"
import time, {TimeService} from "./time"
import {NetService} from "../src/net"

export class TimeDirective extends SelectorDirective {

  constructor(private commonsService: CommonService, private netService: NetService, private timeService: TimeService) {
    super("time")
  }

  protected handle(elem: HTMLElement) {
    const self = this
    const txt = elem.innerText

    const currentTime = this.timeService.getTime()

    const decodedTime = this.timeService.NewMoment()
    decodedTime.year = currentTime.getYear()
    decodedTime.month = currentTime.getMonth()
    decodedTime.dayOfMonth = currentTime.getDayOfMonth()
    decodedTime.hour = currentTime.getHour()
    decodedTime.minutes = currentTime.getMinutes()
    decodedTime.seconds = currentTime.getSeconds()

    let r
    const dateTime = elem.getAttribute("datetime")
    let dataStr = dateTime ? dateTime : txt

    function handleDuration() {
      let durationStr
      let durationMax
      const slashPos = dataStr.indexOf('/')
      if (slashPos > 0) {
        let maxString = dataStr.substring(slashPos + 1)
        if (maxString.charAt(0) !== 'P') {
          maxString = 'P' + maxString
        }
        const durMax = self.timeService.NewDuration()
        durationMax = durMax.fromString(maxString).toString()
        const durationMin = self.timeService.NewDuration().fromString(dataStr).toString(durMax.unit.name)
        durationStr = durationMin + " \xE0 " + durationMax
      } else {
        durationStr = self.timeService.NewDuration().fromString(dataStr).toString()
      }
      r = {
        replacement: durationStr
      }
      if (!dateTime) {
        elem.setAttribute("datetime", dataStr)
      }
      elem.innerHTML = r.replacement
      elem.classList.add('duration')
    }

    function handleTime() {
      decodedTime.fromString(dataStr)
      r = self.timeService.toString(currentTime, decodedTime)
      const previousSibling = elem.previousSibling
      if (r.replacement && (!previousSibling || previousSibling.textContent.trim().length === 0)) {
        r.replacement = self.commonsService.capitalizeFirstLetter(r.replacement)
      }
      dataStr = self.timeService.toISOString(decodedTime)
      self.netService.checkedLink(elem, txt, r.timeLink, r.replacement, false, r.title)
      if (!dateTime) {
        elem.setAttribute("datetime", dataStr)
      }
    }

    if (dataStr.charAt(0) === 'P') {
      handleDuration()
    } else {
      handleTime()
    }
  }
}
