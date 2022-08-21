import {SsgContext} from "../../SsgContext"
import {PeopleReplacerFactory} from "../../people/PeopleReplacerFactory"
import {HtmlClassReplaceCommand} from "./HtmlClassReplaceCommand"

describe("HtmlClassReplaceCommand", () => {

  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  function newContext() {
    const context = new SsgContext("fr", intlOptions)
    context.currentFile = {
      contents: `<span class="people">Jérôme Beau</span>`, encoding: "utf8", lastModified: new Date(),
      name: "time/1/9/9/0/08/index.html"
    }
    return context
  }

  test("replaces", async () => {
    const command = new HtmlClassReplaceCommand("people", new PeopleReplacerFactory())
    const context = newContext()
    const file = await command.execute(context)
    expect(file.contents).toBe(`<a href="/people/b/BeauJerome">Jérôme Beau</a>`)
  })
})

