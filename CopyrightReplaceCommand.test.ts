import { rr0DefaultCopyright } from "./RR0DefaultCopyright"
import { rr0TestUtil } from "./test/RR0TestUtil"
import { SsiEchoVarReplaceCommand } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"

describe("CopyrightReplaceCommand", () => {

  test("default copyright with no handler", async () => {
    const command = new SsiEchoVarReplaceCommand("copyright", [])
    const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/index.html",
      `This is published by <!--#echo var="copyright" -->!`)
    context.file.meta.copyright = undefined
    await command.execute(context)
    expect(context.file.meta.copyright).toBeUndefined()
    expect(context.file.contents).toBe(`This is published by !`)
  })

  test("default copyright with handler", async () => {
    const command = new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright])
    const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/index.html",
      `This is published by <!--#echo var="copyright" -->!`)
    context.file.meta.copyright = undefined
    await command.execute(context)
    expect(context.file.meta.copyright).toBeUndefined()
    expect(context.file.contents).toBe(`This is published by <a href="/GFDL.html">RR0</a>!`)
  })

  test("copyright with default handler", async () => {
    const command = new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright])
    const context = rr0TestUtil.newHtmlContext("time/1/9/5/4/10/index.html",
      `This is published by <!--#echo var="copyright" -->!`)
    context.file.meta.copyright = "Some editor"
    await command.execute(context)
    expect(context.file.meta.copyright).toBe("Some editor")
    expect(context.file.contents).toBe("This is published by Some editor!")
  })
})
