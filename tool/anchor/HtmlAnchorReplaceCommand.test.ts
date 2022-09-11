import {SsgContext} from "../SsgContext"
import {HtmlAnchorReplaceCommand} from "./HtmlAnchorReplaceCommand"
import {AnchorReplacerFactory} from "./AnchorReplacerFactory"
import {TimeContext} from "../time/TimeContext"

describe("HtmlAnchorReplaceCommand", () => {

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
    const context = new SsgContext("fr", new TimeContext(intlOptions))
    context.currentFile = {
      contents: `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`,
      encoding: "utf8",
      lastModified: new Date(),
      name: "time/1/9/9/0/08/index.html"
    }
    return context
  }

  test("replace anchor tag", async () => {
    const command = new HtmlAnchorReplaceCommand(new AnchorReplacerFactory())
    const context = newContext()
    const file = await command.execute(context)
    expect(file.contents).toBe(`<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a>`)
  })
})

