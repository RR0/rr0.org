import {SsgContext} from "../SsgContext"
import {TimeTextBuilder} from "./TimeTextBuilder"
import {TimeContext} from "./TimeContext"

export class RelativeTimeTextBuilder {

  static build(oldContext: SsgContext, newContext: SsgContext): string {
    const previousTime = oldContext.time
    if (!previousTime.isDefined()) {
      return TimeTextBuilder.build(newContext)
    }
    const deltaContext = new SsgContext(oldContext.locales, new TimeContext({...oldContext.time.options}))
    const deltaTime = deltaContext.time
    let dayOfMonthDelta: number | undefined
    let yearDelta: number | undefined
    let monthDelta: number | undefined
    let hourDelta: number | undefined
    let minutesDelta: number | undefined

    function setYear(year: number) {
      if (previousTime.year) {
        yearDelta = year - previousTime.year
        if (yearDelta != 0) {
          deltaTime.year = year
        }
      }
    }

    function setMonth(month: number) {
      if (yearDelta === 0 && previousTime.month) {
        monthDelta = month - previousTime.month
        if (monthDelta != 0) {
          deltaTime.month = month
        }
      } else if (yearDelta != 0) {
        deltaTime.month = month
      }
    }

    function setDayOfMonth(dayOfMonth: number) {
      if (yearDelta === 0 && monthDelta === 0) {
        dayOfMonthDelta = dayOfMonth - (previousTime.dayOfMonth || 0)
        if (dayOfMonthDelta != 0) {
          deltaTime.dayOfMonth = dayOfMonth
        }
      } else if (monthDelta != 0) {
        deltaTime.dayOfMonth = dayOfMonth
      }
    }

    function setHour(hour: number) {
      if (yearDelta === 0 && monthDelta === 0 && dayOfMonthDelta === 0 && previousTime.hour) {
        hourDelta = hour - previousTime.hour
        if (hourDelta != 0) {
          deltaTime.hour = hour
        }
      }
      deltaTime.hour = hour
    }

    function setMinutes(minutes: number) {
      if (yearDelta === 0 && monthDelta === 0 && dayOfMonthDelta === 0 && hourDelta === 0 && previousTime.minutes) {
        minutesDelta = minutes - previousTime.minutes
        if (minutesDelta != 0) {
          deltaTime.minutes = minutes
        }
      }
      deltaTime.minutes = minutes
    }

    const time = newContext.time
    const year = time.year
    if (year) {
      setYear(year)
    }
    const month = time.month
    if (month) {
      setMonth(month)
    }
    const dayOfMonth = time.dayOfMonth
    if (dayOfMonth) {
      setDayOfMonth(dayOfMonth)
    }
    const hour = time.hour
    if (hour) {
      setHour(hour)
    }
    const minutes = time.minutes
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
      const defaultContext = deltaContext.time.isDefined() ? deltaContext : newContext
      text = TimeTextBuilder.build(defaultContext)
    }
    return text
  }
}
