import {PeopleReplacerFactory} from "../people/PeopleReplacerFactory"
import {ClassRegexReplaceCommand} from "./ClassRegexReplaceCommand"
import {testUtil} from "../../../../../test/TestUtil"

describe("ClassRegexReplaceCommand", () => {

  test("replaces", async () => {
    const command = new ClassRegexReplaceCommand("people", new PeopleReplacerFactory())
    const context = testUtil.newHtmlContext("time/1/9/9/0/08/index.html", `<span class="people">Jérôme Beau</span>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
  })
})

