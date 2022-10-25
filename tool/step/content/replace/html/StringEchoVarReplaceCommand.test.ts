import {testUtil} from "../../../../test/TestUtil"
import {HtmlFileInfo} from "../../../../util/file/HtmlFileInfo"
import {StringEchoVarReplaceCommand} from "./StringEchoVarReplaceCommand"

describe("StringEchoVarReplaceCommand", () => {

  test("replaces var in string", async () => {
    const command = new StringEchoVarReplaceCommand("mail", [])
    const context = testUtil.newHtmlContext("Contact.html",
      `<a href="mailto:\$\{mail\}">Commentaires</a>`)
    context.setVar("mail", "javarome@gmail.com")
    expect(context.getVar("mail")).toBe("javarome@gmail.com")
    const file = await command.execute(context) as HtmlFileInfo
    expect(file.contents).toBe(`<a href="mailto:javarome@gmail.com">Commentaires</a>`)
  })
})

