import {TimeReplacerFactory} from "../time/TimeReplacerFactory"
import {HtmlTagReplaceCommand} from "./HtmlTagReplaceCommand"
import {testUtil} from "../../../../../test/TestUtil"

describe("HtmlTagReplaceCommand", () => {

  test("replace time tag", async () => {
    const command = new HtmlTagReplaceCommand("time", new TimeReplacerFactory())
    const context = testUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<a href="/time/2/0/0/4/">2004</a> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
  })
})

