import {AnchorReplacerFactory} from "./AnchorReplacerFactory"
import {testUtil} from "../../../../../test/TestUtil"
import {ClassDomReplaceCommand} from "../class/ClassDomReplaceCommand"

describe("HtmlAnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const command = new ClassDomReplaceCommand("a", new AnchorReplacerFactory("https://rr0.org/"))
    const context = testUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a>`)
  })
})

