import {SsgContext, SsgContextImpl} from "../../../../../SsgContext"
import {RelativeTimeTextBuilder} from "./RelativeTimeTextBuilder"
import {TimeContext} from "./TimeContext"

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
      previousContext.time.year = 2003
      const context = previousContext.clone()
      context.time.year = 2004
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("l'année suivante")
      context.time.month = 6
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("juin 2004")
    }
  })

  test("next month", () => {
    {
      const context1 = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context1.time.year = 2003
      context1.time.month = 9
      const context2 = context1.clone()
      context2.time.month!++
      expect(RelativeTimeTextBuilder.build(context1, context2)).toBe("le mois suivant")
      const context3 = context2.clone()
      context3.time.dayOfMonth = 23 // Resets day of month in context
      expect(RelativeTimeTextBuilder.build(context2, context3)).toBe("jeudi 23")
      const context4 = context3.clone()
      context4.time.month = 12
      expect(RelativeTimeTextBuilder.build(context3, context4)).toBe("décembre")
      const context5 = context4.clone()
      context5.time.month = 1
      context5.time.dayOfMonth = 24
      expect(RelativeTimeTextBuilder.build(context4, context5)).toBe("lundi 24 janvier")
    }
    {
      const context = new SsgContextImpl("en", new TimeContext(intlOptions))
      context.time.year = 2003
      context.time.month = 9
      const previousContext = context.clone()
      context.time.month++
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("the month after")
    }
  })

  test("next day", () => {
    {
      const context = new SsgContextImpl("fr", new TimeContext(intlOptions))
      context.time.year = 2003
      context.time.month = 9
      context.time.dayOfMonth = 23
      const previousContext = context.clone()
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003")
      context.time.dayOfMonth = 24
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("le lendemain")
    }
    {
      const context = new SsgContextImpl("en", new TimeContext(intlOptions))
      context.time.year = 2003
      context.time.month = 9
      context.time.dayOfMonth = 23
      const previousContext = context.clone()
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003")
      context.time.dayOfMonth++
      expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("the day after")
    }
  })

  describe("hour", () => {

    test("next", () => {
      {
        let previousContext: SsgContext = new SsgContextImpl("fr", new TimeContext(intlOptions))
        const context = previousContext.clone()
        context.time.year = 2003
        context.time.month = 9
        context.time.dayOfMonth = 23
        context.time.hour = 16
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003 à 16 h")
        previousContext = context.clone()
        context.time.hour = 17
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("une heure plus tard")
        context.time.minutes = 43
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("17:43")
      }
      {
        let previousContext: SsgContext = new SsgContextImpl("en", new TimeContext(intlOptions))
        const context = previousContext.clone()
        context.time.year = 2003
        context.time.month = 9
        context.time.dayOfMonth = 23
        context.time.hour = 16
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003 at 04 PM")
        previousContext = context.clone()
        context.time.hour = 17
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("one hour later")
        context.time.minutes = 43
        expect(RelativeTimeTextBuilder.build(previousContext, context)).toBe("05:43 PM")
      }
    })
  })
})
