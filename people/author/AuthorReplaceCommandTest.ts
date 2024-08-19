import { AuthorReplaceCommand } from "./AuthorReplaceCommand"
import { rr0TestUtil } from "../../test/RR0TestUtil"
import { describe, expect, test } from "@javarome/testscript"
import { RelativeTimeTextBuilder } from "../../time/RelativeTimeTextBuilder"
import { TimeService } from "../../time/TimeService"
import { TimeTextBuilder } from "../../time/TimeTextBuilder"

describe("AuthorReplaceCommand", () => {

  const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
  const relativeTimeTextBuilder = new RelativeTimeTextBuilder(timeTextBuilder)
  const timeService = new TimeService(timeTextBuilder)

  test("no author", async () => {
    const timeFile = "time/1/9/5/4/index.html"
    const command = new AuthorReplaceCommand(timeService)
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    await command.execute(context)
    expect(context.file.meta.author).toEqual([])
    expect(context.file.contents).toBe("This is published by !")
  })

  test("author only", async () => {
    const timeFile = "time/1/9/5/4/10/index.html"
    const command = new AuthorReplaceCommand(timeService)
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    context.file.meta.author.push("Beau, Jérôme")
    const time = relativeTimeTextBuilder.build(undefined, context)
    await command.execute(context)
    expect(context.file.meta.author).toEqual(["Beau, Jérôme"])
    expect(context.file.contents).toBe(
      `This is published by <div class="document-author"><span class="people">Beau, Jérôme</span>, <span class="time">${time}</span></div>!`)
  })

  test("copyright only", async () => {
    const timeFile = "time/1/9/5/4/10/index.html"
    const command = new AuthorReplaceCommand(timeService)
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    context.file.meta.copyright = "Some publication"
    const time = relativeTimeTextBuilder.build(undefined, context)
    await command.execute(context)
    expect(context.file.meta.author).toEqual([])
    expect(context.file.meta.copyright).toBe("Some publication")
    expect(context.file.contents).toBe(
      `This is published by <div class="document-author">Some publication</div>, <span class="time">${time}</span></div>!`)
  })

  test("author with copyright", async () => {
    const timeFile = "time/1/9/5/4/10/index.html"
    const command = new AuthorReplaceCommand(timeService)
    const context = rr0TestUtil.newHtmlContext(timeFile,
      `This is published by <!--#echo var="author" -->!`)
    context.file.meta.author.push("Beau, Jérôme")
    context.file.meta.copyright = "Some publication"
    await command.execute(context)
    expect(context.file.meta.author).toEqual(["Beau, Jérôme"])
    expect(context.file.meta.copyright).toBe("Some publication")
    expect(context.file.contents).toBe(
      `This is published by <div class="document-author"><span class="people">Beau, Jérôme</span>: Some publication</div>!`)
  })
})
