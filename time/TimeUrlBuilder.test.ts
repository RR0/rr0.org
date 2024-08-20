import { TimeUrlBuilder } from "./TimeUrlBuilder"
import { TimeContext } from "./TimeContext"
import { RR0SsgContextImpl } from "../RR0SsgContext"
import { describe, expect, test } from "@javarome/testscript"

describe("TimeUrlBuilder", () => {

  test("builds year", () => {
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2008)
      const url = TimeUrlBuilder.fromContext(context.time)
      expect(url).toEqual("time/2/0/0/8")
    }
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2012)
      context.time.setMonth(8)
      context.time.setDayOfMonth(12)
      context.time.setYear(2020)  // Resets month and day
      const url = TimeUrlBuilder.fromContext(context.time)
      expect(url).toEqual("time/2/0/2/0")
    }
  })

  test("builds month", () => {
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2001)
      context.time.setMonth(9)
      const url = TimeUrlBuilder.fromContext(context.time)
      expect(url).toBe("time/2/0/0/1/09")
    }
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2012)
      context.time.setMonth(8)
      context.time.setDayOfMonth(12)
      context.time.setMonth(2)
      const url = TimeUrlBuilder.fromContext(context.time)
      expect(url).toEqual("time/2/0/1/2/02")
    }
  })
})
