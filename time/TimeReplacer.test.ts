import { TimeReplacer } from "./TimeReplacer"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { describe, expect, test } from "@javarome/testscript"
import { TimeRenderer } from "./TimeRenderer"

describe("TimeReplacer", () => {

  test("parses year", () => {
    {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer(["time/2/0/0/3/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      expect(replacer.valueReplacement(context, "2003", undefined).outerHTML).toBe(
        `<a href="/time/2/0/0/3/"><time datetime="2003">2003</time></a>`)
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
    {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer(["time/2/0/2/5/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      expect(replacer.valueReplacement(context, "2025\n      ", undefined).outerHTML).toBe(
        `<a href="/time/2/0/2/5/"><time datetime="2025">2025</time></a>`)
      expect(context.time.getYear()).toBe(2025)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
  })

  test("parses interval", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const interval = "2012/2016"
    const timeRenderer = new TimeRenderer(["time/2/0/1/2/index.html", "time/2/0/1/6/index.html"], this.options)
    const replacer = new TimeReplacer(timeRenderer)
    const original = context.file.document.createElement("time")
    original.textContent = interval
    const replaced = await replacer.replacement(context, original)
    expect(replaced.outerHTML)
      .toBe(
        `<span class="time-interval"><a href="/time/2/0/1/2/"><time datetime="2012">2012</time></a> à <a href="/time/2/0/1/6/"><time datetime="2016">2016</time></a></span>`)
    expect(context.time.getYear()).toBe(2016)
    expect(context.time.getMonth()).toBe(undefined)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("parses unsupported", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const interval = "moi"
    const timeRenderer = new TimeRenderer(["time/1/9/9/0/08/index.html"], this.options)
    const replacer = new TimeReplacer(timeRenderer)
    const original = context.file.document.createElement("time")
    original.textContent = interval
    const replacement = await replacer.replacement(context, original)
    expect(replacement.outerHTML).toBe(`<time>moi</time>`)
    expect(context.time.getYear()).toBe(undefined)
    expect(context.time.getMonth()).toBe(undefined)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("parses timezone", async () => {
    {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const interval = "2003-12-24CDT"
      const timeRenderer = new TimeRenderer(["time/2/0/0/3/12/24/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const original = context.file.document.createElement("time")
      original.textContent = interval
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML)
        .toBe(`<a href="/time/2/0/0/3/12/24/">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(12)
      expect(context.time.getDayOfMonth()).toBe(24)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe("CDT")
    }
    /*{
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
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

  test("parses month", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    let value = "2004-09"
    const original = context.file.document.createElement("time")
    original.textContent = value
    const timeRenderer = new TimeRenderer(["/time/2/0/0/4/09/index.html"], this.options)
    const replacer = new TimeReplacer(timeRenderer)
    const replacement = await replacer.replacement(context, original)
    expect(replacement.outerHTML).toBe(`<a href="/time/2/0/0/4/09/">septembre 2004</a>`)
    expect(context.time.getYear()).toBe(2004)
    expect(context.time.getMonth()).toBe(9)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
  })

  describe("parses day", () => {

    test("from full date", () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer(["time/2/0/0/5/08/23/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const replacement = replacer.valueReplacement(context, "2005-08-23", undefined)
      expect(replacement.outerHTML).toBe(
        `<a href="/time/2/0/0/5/08/23/"><time datetime="2005-08-23">mardi 23 août 2005</time></a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
    })

    test("from current date", () => {
      const currentContext = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      currentContext.time.setYear(2005)
      currentContext.time.setMonth(8)
      const context = currentContext.clone()
      const timeRenderer = new TimeRenderer(["time/2/0/0/5/08/23/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const replacement2 = replacer.valueReplacement(context, "23", currentContext)
      expect(replacement2.outerHTML).toBe(
        `<a href="/time/2/0/0/5/08/23/"><time datetime="2005-08-23" title="mardi 23 août 2005">mardi 23</time></a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
    })

    test("from current date with hour", () => {
      const currentContext = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      currentContext.time.setYear(2005)
      currentContext.time.setMonth(8)
      const context = currentContext.clone()
      const timeRenderer = new TimeRenderer(["time/2/0/0/5/08/23/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const replacement1 = replacer.valueReplacement(context, "23 18:45", currentContext)
      expect(replacement1.outerHTML)
        .toBe(
          `<a href="/time/2/0/0/5/08/23/"><time datetime="2005-08-23 18:45" title="mardi 23 août 2005 à 18:45">mardi 23 18:45</time></a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(45)
    })

    test("with hour interval", () => {
      const currentContext = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      currentContext.time.setYear(2005)
      currentContext.time.setMonth(8)
      const context = currentContext.clone()
      const timeRenderer = new TimeRenderer(["time/2/0/0/5/08/23/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const replacement = replacer.valueReplacement(context, "23 18:45/19:00", currentContext)
      expect(replacement.outerHTML)
        .toBe(
          `<a href="/time/2/0/0/5/08/23/" title="mardi 23 août 2005 entre 18:45 et 19:00">mardi 23, entre 18:45 et 19:00</a>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(45)
    })
  })

  test("reset context", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const timeRenderer = new TimeRenderer(["time/2/0/0/5/index.html", "time/2/0/0/6/index.html"], this.options)
    const replacer = new TimeReplacer(timeRenderer)
    const replacement = replacer.valueReplacement(context, "2005", undefined)
    expect(replacement.outerHTML).toBe(`<a href="/time/2/0/0/5/">2005</a>`)
    const original = context.file.document.createElement("time")
    original.textContent = "2006"
    const replacement2 = await replacer.replacement(context, original)
    expect(replacement2.outerHTML).toBe(`<a href="/time/2/0/0/6/">2006</a>`)
  })

  test("avoids linking to current file", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const timeRenderer = new TimeRenderer(["time/1/9/5/4/10/01/index.html"], this.options)
    const replacer = new TimeReplacer(timeRenderer)
    const original = context.file.document.createElement("time")
    original.textContent = "1954-10-01"
    const replacement = await replacer.replacement(context, original)
    expect(replacement.outerHTML)
      .toBe(`<span class="time">vendredi 1 octobre 1954</span>`)
  })

  describe("parse duration", () => {

    test("with days, hours, minutes and seconds", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer([], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const original = context.file.document.createElement("time")
      original.textContent = "P2D10H23M45S"
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML).toBe(`<time class="duration">2 jours, 10 heures, 23 minutes et 45 secondes</time>`)
    })

    test("with context", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer(["time/1/9/4/7/07/02/index.html"], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      {
        const ctxElement = context.file.document.createElement("time")
        ctxElement.textContent = "1947-07-02"
        const replacement1 = await replacer.replacement(context, ctxElement)
        expect(replacement1.outerHTML).toBe(`<span class="time">mercredi 2 juillet 1947</span>`)
      }
      {
        const element = context.file.document.createElement("time")
        element.textContent = "P20M"
        const replacement = await replacer.replacement(context, element)
        expect(replacement.outerHTML).toBe(`<time class="duration">20 minutes</time>`)
      }
    })

    test("with approximation", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer([], this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const original = context.file.document.createElement("time")
      original.textContent = "~P2H"
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML).toBe(`<time class="duration">environ 2 heures</time>`)
    })
  })

  describe("parses hour", () => {

    test("with context", () => {
      // Empty context
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer(["time/2/0/0/6/07/14/index.html", "/time/2/0/0/7/06/15/index.html"],
        this.options)
      const replacer = new TimeReplacer(timeRenderer)
      const replacement = replacer.valueReplacement(context, "2006-07-14 17:56", undefined)
      expect(replacement.outerHTML).toBe(`<a href="/time/2/0/0/6/07/14/">vendredi 14 juillet 2006 à 17:56</a>`)
      expect(context.time.getYear()).toBe(2006)
      expect(context.time.getMonth()).toBe(7)
      expect(context.time.getDayOfMonth()).toBe(14)
      expect(context.time.getHour()).toBe(17)
      expect(context.time.getMinutes()).toBe(56)

      // Change day + hour
      const replacement1 = replacer.valueReplacement(context, "2007-06-15 18:47", undefined)
      expect(replacement1.outerHTML).toBe(`<a href="/time/2/0/0/7/06/15/">vendredi 15 juin 2007 à 18:47</a>`)
      expect(context.time.getYear()).toBe(2007)
      expect(context.time.getMonth()).toBe(6)
      expect(context.time.getDayOfMonth()).toBe(15)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(47)

      // Change hour only
      const hourReplacement = replacer.valueReplacement(context, "19:47", undefined)
      expect(hourReplacement.outerHTML).toBe(
        `<a href="/time/2/0/0/7/06/15/" title="vendredi 15 juin 2007 à 19:47">19:47</a>`)
      expect(context.time.getYear()).toBe(2007)
      expect(context.time.getMonth()).toBe(6)
      expect(context.time.getDayOfMonth()).toBe(15)
      expect(context.time.getHour()).toBe(19)
      expect(context.time.getMinutes()).toBe(47)
    })

    test("with approximation", () => {
      {
        const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
        context.time.setYear(2007)
        context.time.setMonth(6)
        context.time.setDayOfMonth(15)
        const timeRenderer = new TimeRenderer(["time/2/0/0/7/06/15/index.html"], this.options)
        const replacer = new TimeReplacer(timeRenderer)
        const replacement = replacer.valueReplacement(context, "~18:45", undefined)
        expect(replacement.outerHTML).toBe(
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
