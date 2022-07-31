import {SsgContext} from "./SsgContext"
import {RelativeTextDateBuilder} from "./RelativeTextDateBuilder"

describe("RelativeTextDateBuilder", () => {

  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  }

  test("prints year", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2003
      const previousContext = context.clone()
      context.time.year++
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("l'année suivante")
    }
  })

  test("prints month", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      const previousContext = context.clone()
      context.time.month++
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("le mois suivant")
    }
    {
      const context = new SsgContext("en", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      const previousContext = context.clone()
      context.time.month++
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("the month after")
    }
  })

  test("prints day", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      context.time.dayOfMonth = 23
      const previousContext = context.clone()
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003")
      context.time.dayOfMonth = 24
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("le lendemain")
    }
    {
      const context = new SsgContext("en", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      context.time.dayOfMonth = 23
      const previousContext = context.clone()
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003")
      context.time.dayOfMonth++
      expect(RelativeTextDateBuilder.build(previousContext, context)).toBe("the day after")
    }
  })
})
