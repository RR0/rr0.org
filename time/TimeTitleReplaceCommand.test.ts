import {TitleReplaceCommand} from "../tool/step/content/replace/html/head/title/TitleReplaceCommand"
import {testUtil} from "../tool/test/TestUtil"
import {HtmlFileInfo} from "../tool/util/file/HtmlFileInfo"
import {timeDefaultHandler} from "./TimeDefaultTitle"

describe("TitleReplaceCommand", () => {

  test("default title with no handler", async () => {
    const command = new TitleReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html", `This is about <!--#echo var="title" -->!`)
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.title).toBe("time/1/9/5/4/index.html")
    expect(file.contents).toBe("This is about time/1/9/5/4/index.html!")
  })

  test("default title with handler", async () => {
    const command = new TitleReplaceCommand([timeDefaultHandler])
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html", `This is about <!--#echo var="title" -->!`)
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.title).toBe("1954")
    expect(file.contents).toBe("This is about 1954!")
  })

  test("default month title with handler", async () => {
    const command = new TitleReplaceCommand([timeDefaultHandler])
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html", `This is about <!--#echo var="title" -->!`)
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.title).toBe("Octobre 1954")
    expect(file.contents).toBe("This is about Octobre 1954!")
  })

  test("default day of month title with handler", async () => {
    const command = new TitleReplaceCommand([timeDefaultHandler])
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/01/index.html",
      `This is about <!--#echo var="title" -->!`)
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.title).toBe("Vendredi 1 octobre 1954")
    expect(file.contents).toBe("This is about Vendredi 1 octobre 1954!")
  })
})

