import { TimeReplacerFactory } from "./TimeReplacerFactory"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { HtmlTagReplaceCommand } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { TimeRenderer } from "./TimeRenderer"
import { TimeTextBuilder } from "./TimeTextBuilder"

describe("HtmlTagReplaceCommand", () => {

  const timeFiles = ["time/2/0/0/4/index.html"]
  const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
  const renderer = new TimeRenderer(timeFiles, timeTextBuilder)

  test("replace time tag", async () => {
    const command = new HtmlTagReplaceCommand("time", new TimeReplacerFactory(renderer))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    await command.execute(context)
    expect(context.file.contents).toBe(
      `<html><head><meta name="generator" content="ssg-api"></head><body><a href="/time/2/0/0/4/"><time datetime="2004">2004</time></a> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a></body></html>`)
  })
})
