import common, {CommonModule} from "../src/common"

import people from '../people/people'
import nav, {NavModule} from "../src/nav/nav"
import lang, {LangModule} from "../src/lang"
import net, {NetModule} from "../src/net"
import {TimeDirective} from "./rr0-time"
import {Moment} from "./Moment"

declare var google

export interface TimeLink {
  replacement: string
  timeLink: string
  title: string
}

export class TimeService {
  chartZone = null
  /**
   * http://www.w3.org/html/wg/drafts/html/master/text-level-semantics.html#the-time-element
   * http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#global-dates-and-times
   *
   * ((-)?[1-9]\d{3})(-(\d{1,2})(-(\d{1,2})(T\d{1,2}:\d{1:2])?)?)?
   *
   * 1947-06-21T14:20-02:00
   */
  times

  chart

  private DATETIME_FORMATS = {
    MONTH: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ],
    DAY: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    ]
  }

  constructor(private $locale, private timeRoot, private commonsService) {
    /*const paramLang = function (lang) {
      return (!lang) ? rr0.context.language : lang
    }*/
  }

  addYear(time: Moment, y, yLink, t) {
    const self = this
    let s = ""
    if (!y) {
      y = time.year
    }
    if (!yLink) {
      yLink = self.yearLink(y)
    }
    if (!t) {
      const p = (<any>people).getPeople()
      if (p) {
        t = p.toString()
        if (p.born) {
          t += " a " + (y - p.born.getFullYear()) + " ans"
        } else {
          t = "Naissance de " + t
        }
      }
    }
    if (y) {
      s += common.service.link(yLink, y, t)
    }
    return s
  }

  toISOString(moment: Moment): string {
    let s = moment.year.toString()
    if (moment.month) {
      s += `-${this.commonsService.zero(moment.month)}`
    }
    if (moment.dayOfMonth) {
      s += `-${this.commonsService.zero(moment.dayOfMonth)}`
    }
    if (moment.hour) {
      s += `T${this.commonsService.zero(moment.hour)}:${this.commonsService.zero(moment.minutes)}`
    }
    return s
  }

  /*getTimes: function () {
   if (typeof google !== 'undefined' && typeof google.visualization !== 'undefined' && !times) {
   times = createTimesData();
   }
   return times;
   },*/
  /*setChartsHeight(h: number) {
    this.chartZone.style.height = h + '%'
    rr0.getSideZone("map-canvas").style.height = (100 - h) + '%'
  }*/

  /*drawChart: function () {
   if (times) {
   var options = {
   'title': "Heures d'observation",
   'width': this.chartZone.offsetWidth,
   'height': this.chartZone.offsetHeight - document.getElementById("head").offsetHeight,
   legend: {position: 'none'}
   };
   chart.draw(times, options);
   } else {
   self.setChartsHeight(0);
   }
   },*/

  getDate(t: Moment, y?, m?, d?): Date {
    let dat
    if (!y) {
      y = t.getYear()
    }
    if (y) {                    // No getTime().year set means no date set
      dat = new Date()
      dat.setFullYear(y)
      if (!d) {
        d = t.getDayOfMonth()
      }
      dat.setDate(d)
      if (!m) {
        m = t.getMonth()
      }
      if (m) {
        dat.setMonth(m - 1)
      }
    }
    return dat
  }

  addMonth(t: Moment, m: number) {
    let s = ""
    if (m) {
      t.month = m
    }
    if (t.month) {
      s += this.monthName(t)
    }
    return s
  }

  /**
   *
   * @param t
   * @param d
   * @returns {string}
   */
  addDayOfMonth(t: Moment, d: number) {
    let s = ""
    if (!d) {
      d = t.dayOfMonth
    }
    if (d) {
      const dayName = this.dayOfWeekName(this.getDayOfWeek(t, t.year, t.month, d))
      s += dayName + " "
      s += (d === 1 ? "1<sup>er</sup>" : d)
    }
    return s
  }

  addDate(t: Moment, p, y: number, m, d) {
    if (!y) {
      y = t.year
    }
    let s = ""
    if (y) {
      if (!m) {
        m = t.getMonth()
      }
      if (!d) {
        d = t.getDayOfMonth()
      }
      const newDate = new Date()
      newDate.setFullYear(y)
      let dateLink = this.yearLink(y)
      if (m) {
        newDate.setMonth(m)
        dateLink += `/${common.service.zero(m)}`
        if (d) {
          newDate.setDate(d)
//                s = "le ";
          s += this.addDayOfMonth(t, d)
          dateLink += `/${common.service.zero(d)}`
        } else {
//                s = "en ";
        }
        s += ` ${this.addMonth(t, m)}`
      } else {
//            s += "en ";
      }
      const tt = null
      s += ` ${this.addYear(tt, y, dateLink, t)}`
    }
    return s
  }

  monthNames() {
    return this.DATETIME_FORMATS.MONTH
  }

  /*            getTime: function () {
   return addDate();
   },*/
  monthName(t: Moment, m?) {
    if (!m) {
      if (t.month) {
        m = t.month
      }
    }
    return this.monthNames()[m - 1]
  }

  /**
   * Builds a address to link to a year page/directory.
   *
   * @param y The year
   * @param decade if the year (such as "1950") is to be understood as a decade (1950s).
   * @returns {string} The link
   */
  yearLink(y, decade?) {
    const yString = y.toString()
    let yLink = this.timeRoot
    let pos = 0
    yLink += (y < 1000 ? "0" : yString.substring(pos, ++pos)) + "/"
    yLink += (y < 100 ? "0" : yString.substring(pos, ++pos)) + "/"
    yLink += (y < 10 ? "0" : yString.substring(pos, ++pos)) + "/"
    if (!decade) {
      yLink += yString.substring(pos, ++pos)
    }
    return yLink
  }

  dayOfWeekNames() {
    return this.DATETIME_FORMATS.DAY
  }

  dayOfWeekName(d) {
    return this.dayOfWeekNames()[d]
  }

  getDayOfWeek(t: Moment, y?, m?, d?) {
    return this.getDate(t, y, m, d).getDay()
  }

  setYear(t: Moment, y?: number) {
    if (y) {
      t.year = y
    }
  }

  isTimeURL(u?) {
    if (!u) {
      u = this.commonsService.getUri()
    }
    return u.indexOf(this.timeRoot) === 0
  }

  getYear(t: Moment) {
    if (!t.year) {
      const u = this.commonsService.getUri()
      if (this.isTimeURL(u)) {
        const parts = u.split("/")
        t.year = 0
        let mul = 1000
        for (let i = 2; i < parts.length; i++) {
          const v = parts[i]
          if (common.service.isNumber(v)) {
            if (i <= 5) {
              t.year += v * mul
              mul /= 10
            } else if (!t.month) {
              t.month = parseInt(v, 10)
            } else if (!t.dayOfMonth) {
              t.dayOfMonth = parseInt(v, 10)
            }
          } else {
            break
          }
        }
      }
    }
    return t.year
  }

  setHour(t: Moment, h) {
    if (h) {
      t.hour = h
    }
  }

  setMinutes(t: Moment, mn?: number) {
    if (mn) {
      t.minutes = mn
    }
  }

  setMonth(t: Moment, m?: number) {
    if (m) {
      t.setMonth(m)
    }
  }

  setDayOfMonth(t: Moment, d?: number) {
    if (d) {
      t.dayOfMonth = d
      t.hour = null
      t.minutes = null
    }
  }

  toLink(contextTime: Moment, time: Moment): TimeLink {
    let timeLink
    let repYear
    let titYear
    let repMonth
    let titMonth
    let repDay
    let titDay
    let repHour
    const self = this
    const y = time.getYear()
    let otherYear
    if (y) {
      otherYear = y !== contextTime.getYear()
      timeLink = this.yearLink(y)
      titYear = y
      if (otherYear) {
        contextTime.setYear(y)
        repYear = ` ${y}`
      }
    }
    let otherMonth
    const m = time.getMonth()
    if (m) {
      titMonth = this.monthName(contextTime, m)
      timeLink += `/${this.commonsService.zero(m)}`
      otherMonth = otherYear || m !== contextTime.getMonth()
      if (otherMonth) {
        contextTime.setMonth(m)
        repMonth = ` ${titMonth}`
      }
    }
    let otherDay = 0
    const d = time.getDayOfMonth()
    if (d) {
      const dayAsNumber = d
      let dOW
      if (!!(dayAsNumber)) {
        dOW = this.dayOfWeekName(this.getDayOfWeek(contextTime, y, m, d))
        titDay = `${dOW} ${d}${d === 1 ? "er" : ""}`
        otherDay = otherMonth ? 30 : d - contextTime.getDayOfMonth()
      } else {
        titDay = d
        otherDay = 1
      }
      if (otherDay !== 0) {
        timeLink += "/" + this.commonsService.zero(d)
        repDay = titDay
        if (!this.isTimeURL() && contextTime.getDayOfMonth()) {
          switch (otherDay) {
            case -1:
              repDay = "veille"
              break
            case 1:
              repDay = "lendemain"
              break
            case 2:
              repDay = "surlendemain"
              break
            default:
              if (otherDay <= 7) {
                repDay = otherDay < 0 ? dOW + " pr\xE9c\xE9dent" : `${dOW} suivant`
              }
          }
        }
        contextTime.setDayOfMonth(d)
      }
    }
    let titHour
    const h = time.getHour()
    let otherHour

    function registerTimeToDraw(updatedHour) {
      /*          var timesToUpdate = self.getTimes();
       if (timesToUpdate) {
       self.setChartsHeight(30);
       for (var i = 0; i < timesToUpdate.getNumberOfRows(); i++) {
       var iteratedHour = timesToUpdate.getValue(i, 0);
       if (iteratedHour === updatedHour) {
       var countForThatHour = timesToUpdate.getValue(i, 1);
       countForThatHour++;
       timesToUpdate.setValue(i, 1, countForThatHour);
       break;
       }
       }
       }*/
    }

    function handleHour() {
      if (!!(h)) {
        titHour = self.commonsService.zero(h)
      } else {
        titHour = h
        otherHour = true
      }
      if (h) {
        registerTimeToDraw(h)
      }
      otherHour = otherHour || otherDay || h !== contextTime.getHour()
      if (d) {
        titHour = `${time.isApprox() ? 'vers' : '\xE0'} ${titHour}`
      }
      if (otherHour) {
        contextTime.setHour(h)
      }// TODO: else manage to display "30 mn later"
      repHour = titHour  // For now, always display hours, even if unchanged
    }

    if (h) {
      handleHour()
    }
    let otherMinutes
    const mn = time.getMinutes()
    if (mn || h) {
      const th = `:${this.commonsService.zero(mn)}`
      titHour += th
      otherMinutes = otherHour || mn !== contextTime.getMinutes()
      if (otherMinutes) {
        contextTime.setMinutes(mn)
        repHour += th
      }
    }
    const s = time.getSeconds()
    if (s) {
      const ts = `:${this.commonsService.zero(s)}`
      titHour += ts
      const otherSeconds = otherMinutes || s !== contextTime.getSeconds()
      if (otherSeconds) {
        contextTime.setSeconds(s)
        repHour += ts
      }
    }
    let titZ
    const z = time.getTimeZone()
    if (z) {
      titZ = `(UTC${z >= 0 ? '+' : ""}${z})`
    }
    let replacement = ""
    let title = ""
    if (repDay) {
      replacement += repDay
    }
//            else {
//                if (! repMonth) {
//                    replacement = "m\xEAme jour";
//                }
//            }
    if (titDay) {
      title += titDay
    }
    if (repMonth) {
      replacement += repMonth
    }
    if (titMonth) {
      title += " " + titMonth
    }
    if (repYear) {
      replacement += repYear
    }
    if (titYear) {
      title += ` ${titYear}`
    }
    if (repHour) {
      replacement += ` ${repHour}`
    }
    if (titHour) {
      title += `, ${titHour}`
    }
    if (titZ) {
      title += ` ${titZ}`
    }
    if (time.startDate) {
      const start = self.toLink(time, time.startDate).replacement
      const end = replacement
      const betweenWord = repDay ? 'au' : '\xE0'
      replacement = `${start} ${betweenWord} ${end}`
      title = `${start} ${betweenWord} ${title}`
    }
    return {
      replacement: replacement.trim(),
      timeLink,
      title: title.trim()
    }
  }
}

export class TimeModule {
  timeRoot = '/time/'

  preYearWords = ["en", "de", "à", "dès", "vers", "depuis", "jusqu'en", "année", "années", "fin", "début", "printemps", "été", "automne", "hiver", "avant", "entre", "et", "ou"]
  preMonthWords = ["en", "de", "à", "dès", "vers", "depuis", "jusqu'en", "mois", "fin", "début", "avant", "entre", "et", "ou"]
  preDayWords = ["au", "le", "du", "à", "vers", "jusqu'au",
    "Au", "Le", "Du", "À", "Vers", "Jusqu'au"]
  readonly service: TimeService

  constructor(private common: CommonModule, lang: LangModule, nav: NavModule, private net: NetModule) {
    const navigationService = nav.service
    navigationService.addStart({
        dir: this.timeRoot,
        label: "<span class='iconic clock'> <span class='label'>Historique</span></span>",
        title: "Historique"
      }
    )
    nav.service.nextHandlers.push((t: Moment, nextLink, next) => {
      let nn
      if (this.service.getYear(t)) {
        nn = this.nextFromTime(t, next)
      }
      return nn
    })
    nav.service.prevHandlers.push((t: Moment, _prevLink, _prev) => {
      let pp
      if (this.service.getYear(t)) {          // If no previous link has been specified, try to devise previous from
        // context time.
        pp = this.previousFromTime(t)
      }
      return pp
    })
    nav.service.prevHandlers.push(this.titleFromTime.bind(this))

    /*if (typeof google !== 'undefined') {
     initGoogleCharts(function () {
     timeService.chartZone = rr0.getSideZone("chart");
     var chart = new google.visualization.ColumnChart(timeService.chartZone);
     rr0.sideCallbacks = rr0.sideCallbacks.concat([timeService.drawChart]);

     for (var i = 0; i < onGoogleChartsLoaded.length; i++) {
     onGoogleChartsLoaded[i]();
     }
     });
     } else {
     console.warn("Google API is not loaded");
     }*/
    this.service = new TimeService(lang.userLang, this.timeRoot, common.service)
    common.directives.push(new TimeDirective(common.service, net.service, this.service))
  }

  /**
   * Find some time-dedicated page near a given time.
   *
   * @param t
   * @param oy The starting year.
   * @param m The starting month.
   * @param changeProc How to determine the next date to look for.
   * @return the found time sibling, if any
   */
  async findTimeSibling(t: Moment, oy, m, changeProc) {
    common.service.log('Looking for time sibling of %o-%o', oy, m)
    const ret = changeProc(oy, m)
    const y = ret.y
    let l = this.service.yearLink(y)
    m = ret.m
    let label = y
    const self = this
    if (m) {
      nav.service.setContents(oy, this.service.yearLink(oy))
      l += "/" + this.common.service.zero(m)
      label = this.service.monthName(m)
      if (y !== t.year) {
        label += ' ' + y
      }
    } else {
      const cLink = this.service.yearLink(oy, true)
      if (cLink !== this.common.service.getUri()) {
        nav.service.setContents(~~(oy / 10) + "0s", cLink)
      }
    }
    const lExists = await this.net.service.onExists(l)
    if (lExists) {
      const foundSibling = {label: label, link: l}
      common.service.log('Found sibling %o', foundSibling)
      return foundSibling
    } else {
      const currentDate = new Date()
      if (y < currentDate.getFullYear()) {
        return self.findTimeSibling(t, y, m, changeProc)
      }
    }
  }

  private nextFromTime(t: Moment, _n: number) {
    const self = this
    const lookAfter = function (y, m) {
      if (m) {
        if (m < 12) {
          m++                    // Before December?
          return {y: y, m: m}    // Return date with incremented month
        } else {
          m = 1                  // January
        }
      }
      y++
      return {y: y, m: m}        // Return date with incremented year
    }
    return self.findTimeSibling(t, t.year, t.month, lookAfter)
  }

  private titleFromTime(t: Moment) {
    let title = t.getYear() ? t.getYear().toString() : undefined
    if (title) {
      if (t.month) {
        title = `${this.service.monthName(t)} ${title}`
        const dayOfMonth = t.getDayOfMonth()
        if (dayOfMonth) {
          title = `${this.service.dayOfWeekName(this.service.getDayOfWeek(t))} ${dayOfMonth} ${title}`
        }
      }
    }
    return title
  }

  private previousFromTime(t: Moment) {
    const self = this
    const lookBefore = function (y, m) {
      if (m) {
        if (m > 1) {            // Month above february?
          m--
          return {y: y, m: m}  // Return date with decremented month
        } else {
          m = 12               // December
        }
      }
      y--                      // Return date with decremented year
      return {y: y, m: m}
    }
    return self.findTimeSibling(t, t.year, t.month, lookBefore)
  }

  private initGoogleCharts(chartsApiLoaded) {
    google.load('visualization', '1.0', {
      'packages': ['corechart'],
      callback: chartsApiLoaded
    })
  }
}

const time = new TimeModule(common, lang, nav, net)
export default time

