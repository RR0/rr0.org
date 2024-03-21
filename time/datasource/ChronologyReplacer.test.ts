import { beforeEach, describe, test } from "@javarome/testscript"
import { ChronologyReplacer } from "./ChronologyReplacer"
import { RR0CaseRenderer } from "../RR0CaseRenderer"
import { rr0Datasource } from "./rr0/RR0Mapping"
import { urecatRR0Mapping } from "./urecat/UrecatRR0Mapping"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { rr0TestUtil } from "../../test/RR0TestUtil"

describe("ChronologyReplacer", () => {

  let context: HtmlRR0SsgContext
  let chronologyReplacer: ChronologyReplacer

  beforeEach(() => {
    chronologyReplacer = new ChronologyReplacer([urecatRR0Mapping], new RR0CaseRenderer(), {merge: false, save: true},
      rr0Datasource)
    context = rr0TestUtil.newHtmlContext("time/index.html")
    context.time.setYear(undefined)
//    context.time.setMonth(3)
  })

  test("save", () => {
    const replacement = chronologyReplacer.replacement(context, context.inputFile.document.querySelector("ul"))
  })
})
