import {testUtil} from "../../../../../test/TestUtil"
import {AnchorReplaceCommand} from "./AnchorReplaceCommand"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const command = new AnchorReplaceCommand("https://rr0.org/")
    const context = testUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})

