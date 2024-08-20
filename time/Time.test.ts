import { Time } from "./Time"
import { TimeContext } from "./TimeContext"
import { RR0SsgContextImpl } from "../RR0SsgContext"
import { FileContents, SsgConfig } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"

describe("Time", () => {

  test("parse", () => {
    const exec = Time.parseFileName("time/-0/0/1/1/index.html")
    let pos = 0
    expect(exec[++pos]).toBe("-")
    expect(exec[++pos]).toBe("0")
    expect(exec[++pos]).toBe("0")
    expect(exec[++pos]).toBe("1")
    expect(exec[++pos]).toBe("1")
    expect(exec[++pos]).toBeUndefined()
    expect(exec[++pos]).toBeUndefined()
    expect(exec[++pos]).toBe("index.html")
  })

  describe("contextFromFile", () => {
    const config: SsgConfig = {outDir: "out"}
    const timeContext = new TimeContext()
    const context = new RR0SsgContextImpl("fr", timeContext, config)

    test("recognize year before 0 AD", () => {
      context.file = new FileContents("time/-0/0/1/1/index.html", "utf-8", "", new Date("2012-08-12"),
        {lang: "fr", variants: []})
      const newTimeContext = TimeContext.fromFileName(context as any)
      expect(newTimeContext.getYear()).toBe(-11)
    })

    test("recognize year after 0 AD", () => {
      context.file = new FileContents("time/1/9/7/2/index.html", "utf-8", "", new Date("2012-08-12"),
        {lang: "fr", variants: []})
      const newTimeContext = TimeContext.fromFileName(context as any)
      expect(newTimeContext.getYear()).toBe(1972)
    })

    test("recognize month", () => {
      context.file = new FileContents("time/1/9/7/2/08/index.html", "utf-8", "", new Date("2012-08-12"),
        {lang: "fr", variants: []})
      const newTimeContext = TimeContext.fromFileName(context as any)
      expect(newTimeContext.getYear()).toBe(1972)
      expect(newTimeContext.getMonth()).toBe(8)
    })

    test("recognize day", () => {
      context.file = new FileContents("time/1/9/7/2/08/12/index.html", "utf-8", "", new Date("2012-08-12"),
        {lang: "fr", variants: []})
      const newTimeContext = TimeContext.fromFileName(context as any)
      expect(newTimeContext.getYear()).toBe(1972)
      expect(newTimeContext.getMonth()).toBe(8)
      expect(newTimeContext.getDayOfMonth()).toBe(12)
    })
  })
})
