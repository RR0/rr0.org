import {PeopleReplacerFactory} from "../../people/PeopleReplacerFactory"
import {HtmlClassReplaceCommand} from "./HtmlClassReplaceCommand"
import {testUtil} from "../../test/TestUtil"

describe("HtmlClassReplaceCommand", () => {

  test("replaces", async () => {
    const command = new HtmlClassReplaceCommand("people", new PeopleReplacerFactory())
    const context = testUtil.newContext("time/1/9/9/0/08/index.html", `<span class="people">Jérôme Beau</span>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
  })
})

