import {testUtil} from "../../../../../test/TestUtil"
import {HtmlFileInfo} from "../../../../../util/file/HtmlFileInfo"
import {CopyrightReplaceCommand} from "./CopyrightReplaceCommand"
import {rr0DefaultCopyright} from "./RR0DefaultCopyright"

describe("CopyrightReplaceCommand", () => {

  test("default copyright with no handler", async () => {
    const command = new CopyrightReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html", "This this published by ${copyright} !")
    context.currentFile!.copyright = undefined
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.copyright).toBeUndefined()
    expect(file.contents).toBe("This this published by  !")
  })

  test("default copyright with handler", async () => {
    const command = new CopyrightReplaceCommand([rr0DefaultCopyright])
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html", "This is published by ${copyright} !")
    context.currentFile!.copyright = undefined
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.copyright).toBe("RR0")
    expect(file.contents).toBe("This is published by RR0 !")
  })

  test("copyright with default handler", async () => {
    const command = new CopyrightReplaceCommand([rr0DefaultCopyright])
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html", "This is published by ${copyright} !")
    context.currentFile!.copyright = "Some editor"
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.copyright).toBe("Some editor")
    expect(file.contents).toBe("This is published by Some editor !")
  })
})

