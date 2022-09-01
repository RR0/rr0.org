import {SsgContext} from "../../SsgContext"
import {TimeReplacerFactory} from "../../time/TimeReplacerFactory"
import {HtmlTagReplaceCommand} from "./HtmlTagReplaceCommand"
import {AnchorReplacerFactory} from "../../anchor/AnchorReplacerFactory"

describe("HtmlTagReplaceCommand", () => {

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
      contents: `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`,
      encoding: "utf8",
      lastModified: new Date(),
      name: "time/1/9/9/0/08/index.html"
    }
    return context
  }

  test("replace time tag", async () => {
    const command = new HtmlTagReplaceCommand("time", new TimeReplacerFactory())
    const context = newContext()
    const file = await command.execute(context)
    expect(file.contents).toBe(`<a href="/time/2/0/0/4/">2004</a> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
  })

  test("replace anchor tag", async () => {
    const command = new HtmlTagReplaceCommand("a", new AnchorReplacerFactory())
    const context = newContext()
    const file = await command.execute(context)
    expect(file.contents).toBe(`<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a>`)
  })
})

