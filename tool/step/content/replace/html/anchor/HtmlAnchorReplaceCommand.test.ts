import {HtmlAnchorReplaceCommand} from "./HtmlAnchorReplaceCommand"
import {AnchorReplacerFactory} from "./AnchorReplacerFactory"
import {testUtil} from "../../../../../test/TestUtil"

describe("HtmlAnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const command = new HtmlAnchorReplaceCommand(new AnchorReplacerFactory())
    const context = testUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a>`)
  })
})

