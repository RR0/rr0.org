import {TimeReplacerFactory} from "./TimeReplacerFactory"
import {SsgContext} from "../SsgContext"
import {TimeReplacer} from "./TimeReplacer"

describe("TimeReplacerFactory", () => {

  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  test("parses year", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      const replacer = new TimeReplacer(["time/2/0/0/3"])
      expect(replacer.valueReplacement(context, "2003"))
        .toBe(`<a href="/time/2/0/0/3" title="2003">2003</a>`)
      expect(context.time.year).toBe(2003)
      expect(context.time.month).toBe(undefined)
      expect(context.time.dayOfMonth).toBe(undefined)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
      expect(context.time.timeZone).toBe(undefined)
    }
    {
      const context = new SsgContext("fr", intlOptions)
      const replacer = new TimeReplacer(["time/2/0/2/5"])
      expect(replacer.valueReplacement(context, "2025\n      "))
        .toBe(`<a href="/time/2/0/2/5" title="2025">2025</a>`)
      expect(context.time.year).toBe(2025)
      expect(context.time.month).toBe(undefined)
      expect(context.time.dayOfMonth).toBe(undefined)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
      expect(context.time.timeZone).toBe(undefined)
    }
  })

  test("parses interval", () => {
    const context = new SsgContext("fr", intlOptions)
    let interval = "2012/2016"
    const replacer = new TimeReplacer(["time/2/0/1/2", "time/2/0/1/6"])
    expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
      .toBe(`<a href="/time/2/0/1/2" title="2012">2012</a> à <a href="/time/2/0/1/6" title="2016">2016</a>`)
    expect(context.time.year).toBe(2016)
    expect(context.time.month).toBe(undefined)
    expect(context.time.dayOfMonth).toBe(undefined)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
    expect(context.time.timeZone).toBe(undefined)
  })

  test("parses unsupported", () => {
    const context = new SsgContext("fr", intlOptions)
    let interval = "moi"
    const replacer = new TimeReplacer([])
    expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
      .toBe(`<time>moi</time>`)
    expect(context.time.year).toBe(undefined)
    expect(context.time.month).toBe(undefined)
    expect(context.time.dayOfMonth).toBe(undefined)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
    expect(context.time.timeZone).toBe(undefined)
  })

  test("parses timezone", () => {
    const context = new SsgContext("fr", intlOptions)
    let interval = "2003-12-24CDT"
    const replacer = new TimeReplacer(["time/2/0/0/3/12/24"])
    expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
      .toBe(`<a href="/time/2/0/0/3/12/24" title="mercredi 24 décembre 2003">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
    expect(context.time.year).toBe(2003)
    expect(context.time.month).toBe(12)
    expect(context.time.dayOfMonth).toBe(24)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
    expect(context.time.timeZone).toBe("CDT")
  })

  test("parses month", () => {
    const context = new SsgContext("fr", intlOptions)
    let value = "2004-09"
    const replacer = new TimeReplacer(["time/2/0/0/4/09"])
    expect(replacer.replacement(context, `<time>${value}</time>`, value))
      .toBe(`<a href="/time/2/0/0/4/09" title="septembre 2004">septembre 2004</a>`)
    expect(context.time.year).toBe(2004)
    expect(context.time.month).toBe(9)
    expect(context.time.dayOfMonth).toBe(undefined)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
  })

  test("parses day", () => {
    const context = new SsgContext("fr", intlOptions)
    const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
    expect(replacer.valueReplacement(context, "2005-08-23"))
      .toBe(`<a href="/time/2/0/0/5/08/23" title="mardi 23 août 2005">mardi 23 août 2005</a>`)
    expect(context.time.year).toBe(2005)
    expect(context.time.month).toBe(8)
    expect(context.time.dayOfMonth).toBe(23)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
  })

  test("parses hour", () => {
    {
      const context = new SsgContext("fr", intlOptions)
      const replacer = new TimeReplacer(["time/2/0/0/6/07/14"])
      expect(replacer.valueReplacement(context, "2006-07-14 17:56"))
        .toBe(`<a href="/time/2/0/0/6/07/14" title="vendredi 14 juillet 2006, 17:56">vendredi 14 juillet 2006, 17:56</a>`)
      expect(context.time.year).toBe(2006)
      expect(context.time.month).toBe(7)
      expect(context.time.dayOfMonth).toBe(14)
      expect(context.time.hour).toBe(17)
      expect(context.time.minutes).toBe(56)
    }
    {
      const context = new SsgContext("fr", intlOptions)
      context.time.year = 2007
      context.time.month = 6
      context.time.dayOfMonth = 15
      const replacer = new TimeReplacer(["time/2/0/0/7/06/15"])
      expect(replacer.valueReplacement(context, "18:47")).toBe(`<a href="/time/2/0/0/7/06/15" title="vendredi 15 juin 2007, 18:47">vendredi 15 juin 2007, 18:47</a>`)
      expect(context.time.year).toBe(2007)
      expect(context.time.month).toBe(6)
      expect(context.time.dayOfMonth).toBe(15)
      expect(context.time.hour).toBe(18)
      expect(context.time.minutes).toBe(47)
    }
  })
})
