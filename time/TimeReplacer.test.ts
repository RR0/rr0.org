import {TimeReplacer} from "./TimeReplacer"
import {rr0TestUtil} from "../test/RR0TestUtil"

describe("TimeReplacer", () => {

  test("parses year", () => {
    {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/0/3"])
      expect(replacer.valueReplacement(context, "2003"))
        .toBe(`<a href="/time/2/0/0/3/">2003</a>`)
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
    {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/2/5"])
      expect(replacer.valueReplacement(context, "2025\n      "))
        .toBe(`<a href="/time/2/0/2/5/">2025</a>`)
      expect(context.time.getYear()).toBe(2025)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
  })

  test("parses interval", () => {
    const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
    let interval = "2012/2016"
    const replacer = new TimeReplacer(["time/2/0/1/2", "time/2/0/1/6"])
    expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
      .toBe(`<a href="/time/2/0/1/2/">2012</a> à <a href="/time/2/0/1/6/">2016</a>`)
    expect(context.time.getYear()).toBe(2016)
    expect(context.time.getMonth()).toBe(undefined)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("parses unsupported", () => {
    const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
    let interval = "moi"
    const replacer = new TimeReplacer([])
    expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
      .toBe(`<time>moi</time>`)
    expect(context.time.getYear()).toBe(undefined)
    expect(context.time.getMonth()).toBe(undefined)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("parses timezone", () => {
    {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const interval = "2003-12-24CDT"
      const replacer = new TimeReplacer(["time/2/0/0/3/12/24"])
      expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
        .toBe(`<a href="/time/2/0/0/3/12/24/">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(12)
      expect(context.time.getDayOfMonth()).toBe(24)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe("CDT")
    }
    /*{
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const interval = "2003-12-24 (CDT)"
      const replacer = new TimeReplacer(["time/2/0/0/3/12/24"])
      expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
        .toBe(`<a href="/time/2/0/0/3/12/24/">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(12)
      expect(context.time.getDayOfMonth()).toBe(24)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe("CDT")
    }*/
  })

  test("parses month", () => {
    const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
    let value = "2004-09"
    const replacer = new TimeReplacer(["time/2/0/0/4/09"])
    expect(replacer.replacement(context, `<time>${value}</time>`, value))
      .toBe(`<a href="/time/2/0/0/4/09/">septembre 2004</a>`)
    expect(context.time.getYear()).toBe(2004)
    expect(context.time.getMonth()).toBe(9)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
  })

  describe("parses day", () => {

    test("from full date", () => {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "2005-08-23"))
        .toBe(`<a href="/time/2/0/0/5/08/23/">mardi 23 août 2005</a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
    })

    test("from current date", () => {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      context.time.setYear(2005)
      context.time.setMonth(8)
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "23"))
        .toBe(`<a href="/time/2/0/0/5/08/23/" title="mardi 23 août 2005">mardi 23</a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
    })

    test("with hour", () => {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      context.time.setYear(2005)
      context.time.setMonth(8)
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "23 18:45"))
        .toBe(`<a href="/time/2/0/0/5/08/23/" title="mardi 23 août 2005 à 18:45">mardi 23 18:45</a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(45)
    })

    test("with hour interval", () => {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      context.time.setYear(2005)
      context.time.setMonth(8)
      const replacer = new TimeReplacer(["time/2/0/0/5/08/23"])
      expect(replacer.valueReplacement(context, "23 18:45/19:00"))
        .toBe(
          `<a href="/time/2/0/0/5/08/23/" title="mardi 23 août 2005 entre 18:45 et 19:00">mardi 23, entre 18:45 et 19:00</a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(45)
    })
  })

  test("reset context", () => {
    const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
    const replacer = new TimeReplacer(["time/2/0/0/5", "time/2/0/0/6"])
    expect(replacer.valueReplacement(context, "2005"))
      .toBe(`<a href="/time/2/0/0/5/">2005</a>`)
    expect(replacer.replacement(context, `<time data-context="none">2006</time>`, "2006", ` data-context="none"`))
      .toBe(`<a href="/time/2/0/0/6/">2006</a>`)
  })

  test("avoids linking to current file", () => {
    const context = rr0TestUtil.newContext("time/1/9/5/4/10/01/index.html", "")
    const replacer = new TimeReplacer(["time/1/9/5/4/10/01"])
    expect(replacer.replacement(context, "<time>1954-10-01</time>", "1954-10-01"))
      .toBe(`<span class="time">vendredi 1 octobre 1954</span>`)
  })

  describe("parse duration", () => {

    test("with days, hours, minutes and seconds", () => {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer([])
      expect(replacer.replacement(context, "<time>P2D10H23M45S</time>", "P2D10H23M45S"))
        .toBe(`<time class="duration">2 jours, 10 heures, 23 minutes et 45 secondes</time>`)
    })

    test("with approximation", () => {
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer([])
      expect(replacer.replacement(context, "<time>~P2H</time>", "~P2H"))
        .toBe(`<time class="duration">environ 2 heures</time>`)
    })
  })

  describe("parses hour", () => {

    test("with context", () => {
      // Empty context
      const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
      const replacer = new TimeReplacer(["time/2/0/0/6/07/14", "time/2/0/0/7/06/15"])
      expect(replacer.valueReplacement(context, "2006-07-14 17:56"))
        .toBe(`<a href="/time/2/0/0/6/07/14/">vendredi 14 juillet 2006 à 17:56</a>`)
      expect(context.time.getYear()).toBe(2006)
      expect(context.time.getMonth()).toBe(7)
      expect(context.time.getDayOfMonth()).toBe(14)
      expect(context.time.getHour()).toBe(17)
      expect(context.time.getMinutes()).toBe(56)

      // Change day + hour
      expect(replacer.valueReplacement(context, "2007-06-15 18:47")).toBe(
        `<a href="/time/2/0/0/7/06/15/">vendredi 15 juin 2007 à 18:47</a>`)
      expect(context.time.getYear()).toBe(2007)
      expect(context.time.getMonth()).toBe(6)
      expect(context.time.getDayOfMonth()).toBe(15)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(47)

      // Change hour only
      expect(replacer.valueReplacement(context, "19:47")).toBe(
        `<a href="/time/2/0/0/7/06/15/" title="vendredi 15 juin 2007 à 19:47">19:47</a>`)
      expect(context.time.getYear()).toBe(2007)
      expect(context.time.getMonth()).toBe(6)
      expect(context.time.getDayOfMonth()).toBe(15)
      expect(context.time.getHour()).toBe(19)
      expect(context.time.getMinutes()).toBe(47)
    })

    test("with approximation", () => {
      {
        const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
        context.time.setYear(2007)
        context.time.setMonth(6)
        context.time.setDayOfMonth(15)
        const replacer = new TimeReplacer(["time/2/0/0/7/06/15"])
        expect(replacer.valueReplacement(context, "~18:45")).toBe(
          `<a href="/time/2/0/0/7/06/15/" title="vendredi 15 juin 2007, vers 18:45">vers 18:45</a>`)
        expect(context.time.getYear()).toBe(2007)
        expect(context.time.getMonth()).toBe(6)
        expect(context.time.getDayOfMonth()).toBe(15)
        expect(context.time.getHour()).toBe(18)
        expect(context.time.getMinutes()).toBe(45)
      }
    })
  })
})
