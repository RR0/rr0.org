import {testUtil} from "../../../../../../../test/TestUtil"
import {HtmlFileInfo} from "../../../../../../../util/file/HtmlFileInfo"
import {AuthorReplaceCommand} from "./AuthorReplaceCommand"

describe("AuthorReplaceCommand", () => {

  test("no author", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html",
      `This is published by <!--#echo var="author" -->!`)
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.author).toEqual([])
    expect(file.contents).toBe("This is published by !")
  })

  test("author only", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html",
      `This is published by <!--#echo var="author" -->!`)
    context.inputFile.meta.author.push("Beau, Jérôme")
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.author).toEqual(["Beau, Jérôme"])
    expect(file.contents).toBe(
      `This is published by <div class="document-author"><span class="people">Beau, Jérôme</span></div>!`)
  })

  test("copyright only", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html",
      `This is published by <!--#echo var="author" -->!`)
    context.inputFile.meta.copyright = "Some publication"
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.author).toEqual([])
    expect(file.meta.copyright).toBe("Some publication")
    expect(file.contents).toBe(`This is published by <div class="document-author">Some publication</div>!`)
  })

  test("author with copyright", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html",
      `This is published by <!--#echo var="author" -->!`)
    context.inputFile.meta.author.push("Beau, Jérôme")
    context.inputFile.meta.copyright = "Some publication"
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.meta.author).toEqual(["Beau, Jérôme"])
    expect(file.meta.copyright).toBe("Some publication")
    expect(file.contents).toBe(
      `This is published by <div class="document-author"><span class="people">Beau, Jérôme</span>: Some publication</div>!`)
  })
})

