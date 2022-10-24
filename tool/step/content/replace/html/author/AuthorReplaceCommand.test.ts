import {testUtil} from "../../../../../test/TestUtil"
import {HtmlFileInfo} from "../../../../../util/file/HtmlFileInfo"
import {AuthorReplaceCommand} from "./AuthorReplaceCommand"

describe("AuthorReplaceCommand", () => {

  test("no author", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/index.html", `This is published by <!--#echo var="authors" -->!`)
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.authors).toEqual([])
    expect(file.contents).toBe("This is published by !")
  })

  test("author only", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html", "This is published by <!--#echo var=\"authors\" -->!")
    context.inputFile.authors.push("Beau, Jérôme")
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.authors).toEqual(["Beau, Jérôme"])
    expect(file.contents).toBe(`This is published by <div class="document-author"><span class="people">Beau, Jérôme</span></div>!`)
  })

  test("copyright only", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html", "This is published by <!--#echo var=\"authors\" -->!")
    context.inputFile.copyright = "Some publication"
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.authors).toEqual([])
    expect(file.copyright).toBe("Some publication")
    expect(file.contents).toBe(`This is published by <div class="document-author">Some publication</div>!`)
  })

  test("author with copyright", async () => {
    const command = new AuthorReplaceCommand()
    const context = testUtil.newHtmlContext("time/1/9/5/4/10/index.html", "This is published by <!--#echo var=\"authors\" -->!")
    context.inputFile.authors.push("Beau, Jérôme")
    context.inputFile.copyright = "Some publication"
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.authors).toEqual(["Beau, Jérôme"])
    expect(file.copyright).toBe("Some publication")
    expect(file.contents).toBe(`This is published by <div class="document-author"><span class="people">Beau, Jérôme</span>: Some publication</div>!`)
  })
})

