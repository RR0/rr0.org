import {SsgContext} from "./SsgContext"
import {TextDateBuilder} from "./TextDateBuilder"

export class RelativeTextDateBuilder {

  static build(previousContext: SsgContext, context: SsgContext): string {
    const previousTime = previousContext.time
    let dayOfMonthDelta: number | undefined
    let yearDelta: number | undefined
    let monthDelta: number | undefined
    let hourDelta: number | undefined
    let minutesDelta: number | undefined

    function setYear(year: number) {
      if (previousTime.year) {
        yearDelta = year - previousTime.year
      }
    }

    function setMonth(month: number) {
      if (previousTime.month) {
        monthDelta = month - previousTime.month
      }
    }

    function setDayOfMonth(dayOfMonth: number) {
      if (previousTime.dayOfMonth) {
        dayOfMonthDelta = dayOfMonth - previousTime.dayOfMonth
      }
    }

    function setHour(hour: number) {
      if (previousTime.hour) {
        hourDelta = hour - previousTime.hour
      }
    }

    function setMinutes(minutes: number) {
      if (previousTime.minutes) {
        minutesDelta = minutes - previousTime.minutes
      }
    }

    const time = context.time
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
    if (dayOfMonthDelta) {
      switch (dayOfMonthDelta) {
        case -1:
          text = context.messages.context.time.relative.day.before
          break
        case +1:
          text = context.messages.context.time.relative.day.after
          break
      }
    } else {
      switch (monthDelta) {
        case -1:
          text = context.messages.context.time.relative.month.before
          break
        case +1:
          text = context.messages.context.time.relative.month.after
          break
      }
      if (!monthDelta) {
        switch (yearDelta) {
          case -1:
            text = context.messages.context.time.relative.year.before
            break
          case +1:
            text = context.messages.context.time.relative.year.after
            break
        }
      }
    }
    return text || TextDateBuilder.build(context)
  }
}
