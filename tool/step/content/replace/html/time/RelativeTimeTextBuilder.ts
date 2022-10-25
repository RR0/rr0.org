import {SsgContext} from "../../../../../SsgContext"
import {TimeTextBuilder} from "./TimeTextBuilder"
import {TimeContext} from "./TimeContext"
import {SsgContextImpl} from "../../../../../SsgContextImpl"

export class RelativeTimeTextBuilder {

  static build(oldContext: SsgContext, newContext: SsgContext): string {
    const previousTime = oldContext.time
    if (!previousTime.isDefined()) {
      return TimeTextBuilder.build(newContext)
    }
    const deltaContext = new SsgContextImpl(oldContext.locales, new TimeContext({...oldContext.time.options}))
    const deltaTime = deltaContext.time
    let dayOfMonthDelta: number | undefined
    let yearDelta: number | undefined
    let monthDelta: number | undefined
    let hourDelta: number | undefined
    let minutesDelta: number | undefined

    function shouldSetDay() {
      return !previousTime.getMonth() || monthDelta === 0
    }

    function shouldSetHour() {
      return !previousTime.getDayOfMonth() || dayOfMonthDelta === 0
    }

    function shouldSetMinutes() {
      return !previousTime.getMinutes() || hourDelta === 0
    }

    function setYear(year: number) {
      const previousYear = previousTime.getYear()
      if (previousYear) {
        yearDelta = year - previousYear
        if (yearDelta != 0) {
          deltaTime.setYear(year)
        }
      }
    }

    function setMonth(month: number) {
      const previousMonth = previousTime.getMonth()
      if (yearDelta === 0 && previousMonth) {
        monthDelta = month - previousMonth
        if (monthDelta != 0) {
          deltaTime.setMonth(month)
        }
      } else if (yearDelta != 0) {
        deltaTime.setMonth(month)
      }
    }

    function setDayOfMonth(dayOfMonth: number) {
      const sameMonth = yearDelta === 0 && shouldSetDay()
      if (sameMonth) {
        dayOfMonthDelta = dayOfMonth - (previousTime.getDayOfMonth() || 0)
        if (dayOfMonthDelta != 0) {
          deltaTime.setDayOfMonth(dayOfMonth)
        }
      } else if (monthDelta != 0) {
        deltaTime.setDayOfMonth(dayOfMonth)
      }
    }

    function setHour(hour: number) {
      const sameDay = yearDelta === 0 && shouldSetDay() && shouldSetHour()
      if (sameDay) {
        hourDelta = hour - (previousTime.getHour() || 0)
        if (hourDelta != 0) {
          deltaTime.setHour(hour)
        }
      } else if (dayOfMonthDelta != 0) {
        deltaTime.setHour(hour)
      }
    }

    function setMinutes(minutes: number) {
      const sameHour = yearDelta === 0 && shouldSetDay() && shouldSetHour() && shouldSetMinutes()
      if (sameHour) {
        minutesDelta = minutes - (previousTime.getMinutes() || 0)
        if (minutesDelta != 0) {
          deltaTime.setMinutes(minutes)
        }
      }
      deltaTime.setMinutes(minutes)
    }

    const time = newContext.time
    const year = time.getYear()
    if (year) {
      setYear(year)
    }
    const month = time.getMonth()
    if (month) {
      setMonth(month)
    }
    const dayOfMonth = time.getDayOfMonth()
    if (dayOfMonth) {
      setDayOfMonth(dayOfMonth)
    }
    const hour = time.getHour()
    if (hour) {
      setHour(hour)
    }
    const minutes = time.getMinutes()
    if (minutes) {
      setMinutes(minutes)
    }
    let text: string | undefined
    let messages = newContext.messages.context.time.relative
    if (dayOfMonthDelta) {
      switch (dayOfMonthDelta) {
        case -1:
          text = messages.day.before
          break
        case +1:
          text = messages.day.after
          break
      }
    } else {
      if (!dayOfMonth) {
        switch (monthDelta) {
          case -1:
            text = messages.month.before
            break
          case +1:
            text = messages.month.after
            break
        }
      }
      if (!month) {
        switch (yearDelta) {
          case -1:
            text = messages.year.before
            break
          case +1:
            text = messages.year.after
            break
        }
      }
      if (!minutes) {
        switch (hourDelta) {
          case -1:
            text = messages.hour.before
            break
          case +1:
            text = messages.hour.after
            break
        }
      }
    }
    if (!text) {
      let print = true
      let defaultContext: SsgContext
      if (deltaContext.time.isDefined()) {
        defaultContext = deltaContext
        const dayOfMonth = defaultContext.time.getDayOfMonth()
        if (dayOfMonth && shouldSetDay()) {
          defaultContext.time.setMonth(newContext.time.getMonth() || previousTime.getMonth(), false)  // give month
          // context for the day but won't
          print = false
        }
      } else {
        defaultContext = newContext
      }
      text = TimeTextBuilder.build(defaultContext, print)
    }
    return text
  }
}
