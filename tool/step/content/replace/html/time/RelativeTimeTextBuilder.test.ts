import {SsgContext} from "../../../../../SsgContext"
import {RelativeTimeTextBuilder} from "./RelativeTimeTextBuilder"
import {TimeContext} from "./TimeContext"
import {SsgContextImpl} from "../../../../../SsgContextImpl"

describe("RelativeTimeTextBuilder", () => {

  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  test("next year", () => {
    {
      const previousContext = new SsgContextImpl("fr", new TimeContext(intlOptions))
      previousContext.time.setYear(2003)
      const context = previousContext.clone()
      context.time.setYear(2004)
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("l'année suivante")
      context.time.setMonth(6)
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("juin 2004")
    }
  })

  test("next month", () => {
    {
      const sept9_2003 = new SsgContextImpl("fr", new TimeContext(intlOptions))
      sept9_2003.time.setYear(2003)
      sept9_2003.time.setMonth(9)
      const oct_2003 = sept9_2003.clone()
      oct_2003.time.setMonth(oct_2003.time.getMonth()! + 1)
      expect(RelativeTimeTextBuilder.build(sept9_2003, oct_2003)).toBe("le mois suivant")
      const oct23_2003 = oct_2003.clone()
      oct23_2003.time.setDayOfMonth(23) // Resets day of month in context
      expect(RelativeTimeTextBuilder.build(oct_2003, oct23_2003)).toBe("jeudi 23")
      const context4 = oct23_2003.clone()
      context4.time.setMonth(12)
      expect(RelativeTimeTextBuilder.build(oct23_2003, context4)).toBe("décembre")
      const context5 = context4.clone()
      context5.time.setMonth(1)
      context5.time.setDayOfMonth(24)
      expect(RelativeTimeTextBuilder.build(context4, context5)).toBe("lundi 24 janvier")
    }
    {
      const context = new SsgContextImpl("en", new TimeContext(intlOptions))
      context.time.setYear(2003)
      context.time.setMonth(9)
      const previousContext = context.clone()
      context.time.setMonth(context.time.getMonth()! + 1)
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("the month after")
    }
  })

  test("next day", () => {
    {
      const context = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      const previousContext = context.clone()
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003")
      context.time.setDayOfMonth(24)
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("le lendemain")
    }
    {
      const context = new SsgContextImpl("en", new TimeContext(intlOptions))
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      const previousContext = context.clone()
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003")
      context.time.setDayOfMonth(context.time.getDayOfMonth()! + 1)
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("the day after")
    }
  })

  describe("hour", () => {

    test("next", () => {
      {
        let previousContext: SsgContext = new SsgContextImpl("fr", new TimeContext(intlOptions))
        const context = previousContext.clone()
        context.time.setYear(2003)
        context.time.setMonth(9)
        context.time.setDayOfMonth(23)
        context.time.setHour(16)
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003 à 16 h")
        previousContext = context.clone()
        context.time.setHour(17)
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("une heure plus tard")
        context.time.setMinutes(43)
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("17:43")
      }
      {
        let previousContext: SsgContext = new SsgContextImpl("en", new TimeContext(intlOptions))
        const context = previousContext.clone()
        context.time.setYear(2003)
        context.time.setMonth(9)
        context.time.setDayOfMonth(23)
        context.time.setHour(16)
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003 at 04 PM")
        previousContext = context.clone()
        context.time.setHour(17)
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("one hour later")
        context.time.setMinutes(43)
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("05:43 PM")
      }
    })
  })
})
