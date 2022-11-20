import {LanguageReplaceCommand} from "./LanguageReplaceCommand"
import {rr0TestUtil} from "../test/RR0TestUtil"

describe("LanguageReplaceCommand", () => {

  test("add english translation", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/6/8/CondonReport/index_fr.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    const outputFile = await command.execute(context)
    expect(outputFile.contents).toBe(
      `<html><head></head><body><span id="alternate"><a href="/time/1/9/6/8/CondonReport/index.html">English translation</a></span></body></html>`)
  })

  test("add french translation", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/6/8/CondonReport/index.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    const outputFile = await command.execute(context)
    expect(outputFile.contents).toBe(
      `<html><head></head><body><span id="alternate"><a href="/time/1/9/6/8/CondonReport/index_fr.html">Traduction française</a></span></body></html>`)
  })
})
