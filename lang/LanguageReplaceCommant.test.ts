import {LanguageReplaceCommand} from './LanguageReplaceCommand';
import {rr0TestUtil} from '../test/RR0TestUtil';
import {describe, expect, test} from "@javarome/testscript";

describe("LanguageReplaceCommand", () => {

  test("add english translation", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/6/8/CondonReport/index_fr.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    const outputFile = await command.execute(context)
    expect(outputFile.contents).toBe(
        `<html lang="fr"><head></head><body><span id="alternate"><a href="/time/1/9/6/8/CondonReport/index.html">English version</a></span></body></html>`)
  })

  test("add french translation", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/6/8/CondonReport/index.html", `<span id="alternate"/>`)
    const command = new LanguageReplaceCommand()
    const outputFile = await command.execute(context)
    expect(outputFile.contents).toBe(
        `<html lang="en"><head></head><body><span id="alternate"><a href="/time/1/9/6/8/CondonReport/index_fr.html">Version française</a></span></body></html>`)
  })
})
