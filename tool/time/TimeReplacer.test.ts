import {TimeReplacer} from "./TimeReplacer"
import {testUtil} from "../test/TestUtil"

describe("TimeReplacer", () => {

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
      const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/0/3"])
      expect(replacer.valueReplacement(context, "2003"))
        .toBe(`<a href="/time/2/0/0/3/">2003</a>`)
      expect(context.time.year).toBe(2003)
      expect(context.time.month).toBe(undefined)
      expect(context.time.dayOfMonth).toBe(undefined)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
      expect(context.time.timeZone).toBe(undefined)
    }
    {
      const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/2/5"])
      expect(replacer.valueReplacement(context, "2025\n      "))
        .toBe(`<a href="/time/2/0/2/5/">2025</a>`)
      expect(context.time.year).toBe(2025)
      expect(context.time.month).toBe(undefined)
      expect(context.time.dayOfMonth).toBe(undefined)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
      expect(context.time.timeZone).toBe(undefined)
    }
  })

  test("parses interval", () => {
    const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
    let interval = "2012/2016"
    const replacer = new TimeReplacer(["time/2/0/1/2", "time/2/0/1/6"])
    expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
      .toBe(`<a href="/time/2/0/1/2/">2012</a> à <a href="/time/2/0/1/6/">2016</a>`)
    expect(context.time.year).toBe(2016)
    expect(context.time.month).toBe(undefined)
    expect(context.time.dayOfMonth).toBe(undefined)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
    expect(context.time.timeZone).toBe(undefined)
  })

  test("parses unsupported", () => {
    const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
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
    {
      const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
      const interval = "2003-12-24CDT"
      const replacer = new TimeReplacer(["time/2/0/0/3/12/24"])
      expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
        .toBe(`<a href="/time/2/0/0/3/12/24/">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
      expect(context.time.year).toBe(2003)
      expect(context.time.month).toBe(12)
      expect(context.time.dayOfMonth).toBe(24)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
      expect(context.time.timeZone).toBe("CDT")
    }
    /*{
      const context = newContext()
      const interval = "2003-12-24 (CDT)"
      const replacer = new TimeReplacer(["time/2/0/0/3/12/24"])
      expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
        .toBe(`<a href="/time/2/0/0/3/12/24/">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
      expect(context.time.year).toBe(2003)
      expect(context.time.month).toBe(12)
      expect(context.time.dayOfMonth).toBe(24)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
      expect(context.time.timeZone).toBe("CDT")
    }*/
  })

  test("parses month", () => {
    const context = newContext()
    let value = "2004-09"
    const replacer = new TimeReplacer(["time/2/0/0/4/09"])
    expect(replacer.replacement(context, `<time>${value}</time>`, value))
      .toBe(`<a href="/time/2/0/0/4/09/">septembre 2004</a>`)
    expect(context.time.year).toBe(2004)
    expect(context.time.month).toBe(9)
    expect(context.time.dayOfMonth).toBe(undefined)
    expect(context.time.hour).toBe(undefined)
    expect(context.time.minutes).toBe(undefined)
  })

  describe("parses day", () => {

    test("from full date", () => {
      const context = newContext()
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "2005-08-23"))
        .toBe(`<a href="/time/2/0/0/5/08/23/">mardi 23 août 2005</a>`)
      expect(context.time.year).toBe(2005)
      expect(context.time.month).toBe(8)
      expect(context.time.dayOfMonth).toBe(23)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
    })

    test("from current date", () => {
      const context = newContext()
      context.time.year = 2005
      context.time.month = 8
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "23"))
        .toBe(`<a href="/time/2/0/0/5/08/23/">mardi 23 août 2005</a>`)
      expect(context.time.year).toBe(2005)
      expect(context.time.month).toBe(8)
      expect(context.time.dayOfMonth).toBe(23)
      expect(context.time.hour).toBe(undefined)
      expect(context.time.minutes).toBe(undefined)
    })

    test("with hour", () => {
      const context = newContext()
      context.time.year = 2005
      context.time.month = 8
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "23 18:45"))
        .toBe(`<a href="/time/2/0/0/5/08/23/">mardi 23 août 2005</a>`)
      expect(context.time.year).toBe(2005)
      expect(context.time.month).toBe(8)
      expect(context.time.dayOfMonth).toBe(23)
      expect(context.time.hour).toBe(18)
      expect(context.time.minutes).toBe(45)
    })

    test("with hour interval", () => {
      const context = newContext()
      context.time.year = 2005
      context.time.month = 8
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "23 18:45/19:00"))
        .toBe(`<a href="/time/2/0/0/5/08/23/">mardi 23 août 2005</a>`)
      expect(context.time.year).toBe(2005)
      expect(context.time.month).toBe(8)
      expect(context.time.dayOfMonth).toBe(23)
      expect(context.time.hour).toBe(18)
      expect(context.time.minutes).toBe(45)
    })
  })

  test("reset context", () => {
    const context = newContext()
    const replacer = new TimeReplacer(["time/2/0/0/5", "time/2/0/0/6"])
    expect(replacer.valueReplacement(context, "2005"))
      .toBe(`<a href="/time/2/0/0/5/">2005</a>`)
    expect(replacer.replacement(context, `<time data-context="none">2006</time>`, "2006"))
      .toBe(`<a href="/time/2/0/0/6/">2006</a>`)
  })

  test("avoids linking to current file", () => {
    const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
    const replacer = new TimeReplacer(["time/1/9/9/0/08"])
    expect(replacer.replacement(context, "<time>1990-08-02</time>", "1990-08-02"))
      .toBe(`<span class="time">jeudi 2 août 1990</span>`)
  })

  describe("parse duration", () => {

    test("with days, hours, minutes and seconds", () => {
      const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer([])
      expect(replacer.replacement(context, "<time>P2D10H23M45S</time>", "P2D10H23M45S"))
        .toBe(`<time class="duration">2 jours, 10 heures, 23 minutes et 45 secondes</time>`)
    })

    test("with approximation", () => {
      const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer([])
      expect(replacer.replacement(context, "<time>~P2H</time>", "~P2H"))
        .toBe(`<time class="duration">environ 2 heures</time>`)
    })
  })

  describe("parses hour", () => {

    test("with context", () => {
      // Empty context
      const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/0/6/07/14", "time/2/0/0/7/06/15"])
      expect(replacer.valueReplacement(context, "2006-07-14 17:56"))
        .toBe(`<a href="/time/2/0/0/6/07/14/">vendredi 14 juillet 2006 à 17:56</a>`)
      expect(context.time.year).toBe(2006)
      expect(context.time.month).toBe(7)
      expect(context.time.dayOfMonth).toBe(14)
      expect(context.time.hour).toBe(17)
      expect(context.time.minutes).toBe(56)

      // Change day + hour
      expect(replacer.valueReplacement(context, "2007-06-15 18:47")).toBe(`<a href="/time/2/0/0/7/06/15/">vendredi 15 juin 2007 à 18:47</a>`)
      expect(context.time.year).toBe(2007)
      expect(context.time.month).toBe(6)
      expect(context.time.dayOfMonth).toBe(15)
      expect(context.time.hour).toBe(18)
      expect(context.time.minutes).toBe(47)

      // Change hour only
      expect(replacer.valueReplacement(context, "18:47")).toBe(`<a href="/time/2/0/0/7/06/15/" title="vendredi 15 juin 2007 à 18:47">18:47</a>`)
      expect(context.time.year).toBe(2007)
      expect(context.time.month).toBe(6)
      expect(context.time.dayOfMonth).toBe(15)
      expect(context.time.hour).toBe(18)
      expect(context.time.minutes).toBe(47)
    })

    test("with approximation", () => {
      {
        const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
        context.time.year = 2007
        context.time.month = 6
        context.time.dayOfMonth = 15
        const replacer = new TimeReplacer(["time/2/0/0/7/06/15"])
        expect(replacer.valueReplacement(context, "~18:45")).toBe(`<a href="/time/2/0/0/7/06/15/" title="vendredi 15 juin 2007, vers 18:45">vers 18:45</a>`)
        expect(context.time.year).toBe(2007)
        expect(context.time.month).toBe(6)
        expect(context.time.dayOfMonth).toBe(15)
        expect(context.time.hour).toBe(18)
        expect(context.time.minutes).toBe(45)
      }
    })
  })
})
