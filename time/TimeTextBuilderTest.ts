import { TimeTextBuilder } from "./TimeTextBuilder"
import { TimeContext } from "./TimeContext"
import { RR0SsgContextImpl } from "../RR0SsgContext"
import { describe, expect, test } from "@javarome/testscript"

describe("TimeTextBuilder", () => {

  test("prints year", () => {
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2003)
      expect(TimeTextBuilder.build(context)).toBe("2003")
    }
  })

  test("prints month", () => {
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2003)
      context.time.setMonth(9)
      expect(TimeTextBuilder.build(context)).toBe("septembre 2003")
    }
    {
      const context = new RR0SsgContextImpl("en", new TimeContext())
      context.time.setYear(2003)
      context.time.setMonth(9)
      expect(TimeTextBuilder.build(context)).toBe("September 2003")
    }
  })

  test("prints day", () => {
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(TimeTextBuilder.build(context)).toBe("mardi 23 septembre 2003")
    }
    {
      const context = new RR0SsgContextImpl("en", new TimeContext())
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(TimeTextBuilder.build(context)).toBe("Tuesday, September 23, 2003")
    }
  })

  test("prints hour", () => {
    {
      const context = new RR0SsgContextImpl("fr", new TimeContext())
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      context.time.setHour(16)
      expect(TimeTextBuilder.build(context)).toBe("mardi 23 septembre 2003 à 16 h")
    }
    {
      const context = new RR0SsgContextImpl("en", new TimeContext())
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(TimeTextBuilder.build(context)).toBe("Tuesday, September 23, 2003")
    }
  })
})
