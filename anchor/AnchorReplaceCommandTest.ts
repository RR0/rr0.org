import { AnchorReplaceCommand } from "./AnchorReplaceCommand"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { describe, expect, test } from "@javarome/testscript"
import { CaseAnchorHandler } from "./CaseAnchorHandler"
import { DataService } from "../DataService"
import { RR0Case } from "../science/crypto/ufo/enquete/dossier/RR0Case"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const caseService = await DataService.create<RR0Case>("case")
    const command = new AnchorReplaceCommand("https://rr0.org/", [new CaseAnchorHandler(caseService)])
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})
