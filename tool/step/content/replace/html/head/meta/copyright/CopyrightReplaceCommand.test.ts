import {testUtil} from "../../../../../../../test/TestUtil"
import {HtmlFileInfo} from "../../../../../../../util/file/HtmlFileInfo"
import {rr0DefaultCopyright} from "./RR0DefaultCopyright"
import {SsiEchoVarReplaceCommand} from "../../../ssi/SsiEchoVarCommand"

describe("CopyrightReplaceCommand", () => {

  test("default copyright with no handler", async () => {
    const command = new SsiEchoVarReplaceCommand("copyright", [])
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html",
      `This is published by <!--#echo var="copyright" -->!`)
    context.inputFile.meta.copyright = undefined
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.copyright).toBeUndefined()
    expect(file.contents).toBe(`This is published by !`)
  })

  test("default copyright with handler", async () => {
    const command = new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright])
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html",
      `This is published by <!--#echo var="copyright" -->!`)
    context.inputFile.meta.copyright = undefined
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.copyright).toBeUndefined()
    expect(file.contents).toBe(`This is published by <a href="/GFDL.html">RR0</a>!`)
  })

  test("copyright with default handler", async () => {
    const command = new SsiEchoVarReplaceCommand("copyright", [rr0DefaultCopyright])
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html",
      `This is published by <!--#echo var="copyright" -->!`)
    context.inputFile.meta.copyright = "Some editor"
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.copyright).toBe("Some editor")
    expect(file.contents).toBe("This is published by Some editor!")
  })
})

