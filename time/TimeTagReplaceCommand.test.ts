import {TimeReplacerFactory} from "./TimeReplacerFactory"
import {rr0TestUtil} from "../test/RR0TestUtil"
import {HtmlTagReplaceCommand} from "ssg-api"
import { describe, expect, test } from '@javarome/testscript';

describe("HtmlTagReplaceCommand", () => {

  test("replace time tag", async () => {
    const command = new HtmlTagReplaceCommand("time", new TimeReplacerFactory(["time/2/0/0/4/index.html"]))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html",
      `<time>2004</time> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(
      `<html><head></head><body><a href="/time/2/0/0/4/">2004</a> <a href="/science/crypto/ufo/enquete/dossier/Roswell">Roswell</a></body></html>`)
  })
})

