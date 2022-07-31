import {TextDateBuilder} from "./TextDateBuilder"
import {SsgContext} from "./SsgContext"

describe("TextDateBuilder", () => {

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
      expect(TextDateBuilder.build(context)).toBe("2003")
    }
  })

  test("prints month", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      expect(TextDateBuilder.build(context)).toBe("septembre 2003")
    }
    {
      const context = new SsgContext("en", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      expect(TextDateBuilder.build(context)).toBe("September 2003")
    }
  })

  test("prints day", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      context.time.dayOfMonth = 23
      expect(TextDateBuilder.build(context)).toBe("mardi 23 septembre 2003")
    }
    {
      const context = new SsgContext("en", intlOptions)
      context.time.year = 2003
      context.time.month = 9
      context.time.dayOfMonth = 23
      expect(TextDateBuilder.build(context)).toBe("Tuesday, September 23, 2003")
    }
  })
})
