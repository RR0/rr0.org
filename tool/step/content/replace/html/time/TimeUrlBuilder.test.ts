import {TimeUrlBuilder} from "./TimeUrlBuilder"
import {TimeContext} from "./TimeContext"
import {SsgContextImpl} from "../../../../../SsgContextImpl"

describe("TimeUrlBuilder", () => {

  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  test("builds year", () => {
    {
      const context = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context.time.setYear(2008)
      const url = TimeUrlBuilder.build(context)
      expect(url).toEqual("time/2/0/0/8")
    }
    {
      const context = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context.time.setYear(2012)
      context.time.setMonth(8)
      context.time.setDayOfMonth(12)
      context.time.setYear(2020)  // Resets month and day
      const url = TimeUrlBuilder.build(context)
      expect(url).toEqual("time/2/0/2/0")
    }
  })

  test("builds month", () => {
    {
      const context = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context.time.setYear(2001)
      context.time.setMonth(9)
      const url = TimeUrlBuilder.build(context)
      expect(url).toBe("time/2/0/0/1/09")
    }
    {
      const context = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context.time.setYear(2012)
      context.time.setMonth(8)
      context.time.setDayOfMonth(12)
      context.time.setMonth(2)
      const url = TimeUrlBuilder.build(context)
      expect(url).toEqual("time/2/0/1/2/02")
    }
  })
})
