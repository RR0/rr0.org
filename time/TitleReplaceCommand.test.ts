import { SsiTitleReplaceCommand } from "./SsiTitleReplaceCommand"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { describe, expect, test } from "@javarome/testscript"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Time } from "./Time"
import { TimeTextBuilder } from "./TimeTextBuilder"

describe("TitleReplaceCommand", () => {

  let timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  const timeDefaultHandler = (context: HtmlRR0SsgContext): string | undefined => {
    let title: string | undefined
    title = Time.titleFromFile(context, context.file.name, timeTextBuilder)
    return title
  }

  describe("Time page", () => {

    test("default title with no handler", async () => {
      const command = new SsiTitleReplaceCommand()
      const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/index.html", `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("time/1/9/5/4/index.html")
      expect(context.file.contents).toBe("This is about time/1/9/5/4/index.html!")
    })

    test("default title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/index.html", `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("1954")
      expect(context.file.contents).toBe("This is about 1954!")
    })

    test("default month title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/10/index.html",
        `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("Octobre 1954")
      expect(context.file.contents).toBe("This is about Octobre 1954!")
    })

    test("default day of month title with handler", async () => {
      const command = new SsiTitleReplaceCommand([timeDefaultHandler])
      const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/10/01/index.html",
        `This is about <!--#echo var="title" -->!`)
      await command.execute(context)
      expect(context.file.title).toBe("Vendredi 1 octobre 1954")
      expect(context.file.contents).toBe("This is about Vendredi 1 octobre 1954!")
    })

  })
})
