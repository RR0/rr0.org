import {PeopleReplacerFactory} from "./PeopleReplacerFactory"
import {rr0TestUtil} from "../test/RR0TestUtil"
import {ClassDomReplaceCommand} from "ssg-api"

describe("ClassRegexReplaceCommand", () => {

  test("replaces", async () => {
    const command = new ClassDomReplaceCommand("people", new PeopleReplacerFactory())
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", `<span class="people">Jérôme Beau</span>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(
      `<html><head></head><body><a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a></body></html>`)
  })
})

