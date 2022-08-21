import {TimeUrlBuilder} from "./TimeUrlBuilder"
import {SsgContext} from "../SsgContext"

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
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2008
      const url = TimeUrlBuilder.build(context)
      expect(url).toEqual("time/2/0/0/8")
    }
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2012
      context.time.month = 8
      context.time.dayOfMonth = 12
      context.time.year = 2020  // Resets month and day
      const url = TimeUrlBuilder.build(context)
      expect(url).toEqual("time/2/0/2/0")
    }
  })

  test("builds month", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2001
      context.time.month = 9
      const url = TimeUrlBuilder.build(context)
      expect(url).toBe("time/2/0/0/1/09")
    }
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2012
      context.time.month = 8
      context.time.dayOfMonth = 12
      context.time.month = 2
      const url = TimeUrlBuilder.build(context)
      expect(url).toEqual("time/2/0/1/2/02")
    }
  })
})
