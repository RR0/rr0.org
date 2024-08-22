import { AnchorReplaceCommand } from "./AnchorReplaceCommand"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { describe, expect, test } from "@javarome/testscript"
import { CaseAnchorHandler } from "./CaseAnchorHandler"
import { AllDataService } from "../data/AllDataService"
import { RR0Case } from "../science/crypto/ufo/enquete/dossier/RR0Case"
import { CaseService } from "../science/crypto/ufo/enquete/dossier/CaseService"
import { TimeRenderer } from "../time/TimeRenderer"
import { TypedDataFactory } from "../data/TypedDataFactory"
import { TimeTextBuilder } from "../time/TimeTextBuilder"
import { TimeElementFactory } from "../time/TimeElementFactory"
import { RR0EventFactory } from "../event/RR0EventFactory"

describe("AnchorReplaceCommand", () => {

  test("replace anchor tag", async () => {
    const dataService = new AllDataService([new TypedDataFactory<RR0Case>(new RR0EventFactory(), "case")])
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const timeRenderer = new TimeRenderer([], timeTextBuilder)
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const caseService = new CaseService(dataService, timeElementFactory)
    const command = new AnchorReplaceCommand("https://rr0.org/", [new CaseAnchorHandler(caseService, timeTextBuilder)])
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head></head><body><time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell/">Roswell</a></body></html>`)
  })
})
