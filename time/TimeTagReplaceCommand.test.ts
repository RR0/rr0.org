import {TimeReplacerFactory} from "./TimeReplacerFactory"
import {HtmlTagReplaceCommand} from "../tool/step/content/replace/html/tag/HtmlTagReplaceCommand"
import {rr0TestUtil} from "../test/RR0TestUtil"

describe("HtmlTagReplaceCommand", () => {

  test("replace time tag", async () => {
    const command = new HtmlTagReplaceCommand("time", new TimeReplacerFactory(["time/2/0/0/4"]))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(
      `<a href="/time/2/0/0/4/">2004</a> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
  })
})

