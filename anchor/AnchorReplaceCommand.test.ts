import {AnchorReplaceCommand} from "./AnchorReplaceCommand"
import {rr0TestUtil} from "../test/RR0TestUtil"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const command = new AnchorReplaceCommand("https://rr0.org/")
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})

