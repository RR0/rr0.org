import { beforeEach, describe, test } from "@javarome/testscript"
import { ChronologyReplacer } from "./ChronologyReplacer"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer"
import { urecatRR0Mapping } from "./urecat/UrecatRR0Mapping"
import { HtmlRR0SsgContext } from "../../RR0SsgContext"
import { rr0TestUtil } from "../../test/RR0TestUtil"
import { SourceRenderer } from "../../source/SourceRenderer"
import { NoteRenderer } from "../../note/NoteRenderer"
import { NoteFileCounter } from "../../note/NoteFileCounter"
import { SourceFactory } from "../../source/SourceFactory"
import { TimeTextBuilder } from "../TimeTextBuilder"
import { AllDataService } from "../../data/AllDataService"
import { HttpSource } from "./HttpSource"

describe("ChronologyReplacer", () => {

  let context: HtmlRR0SsgContext
  let chronologyReplacer: ChronologyReplacer

  beforeEach(() => {
    const dataService = new AllDataService([])
    const baseUrl = "https://rr0.org"
    const http = new HttpSource()
    const sourceFactory = new SourceFactory(dataService, http, baseUrl, rr0TestUtil.intlOptions)
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const caseRenderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
      new SourceRenderer(timeTextBuilder), timeElementFactory)
    chronologyReplacer = new ChronologyReplacer([urecatRR0Mapping], caseRenderer)
    context = rr0TestUtil.newHtmlContext("time/index.html")
    context.time.setYear(undefined)
//    context.time.setMonth(3)
  })

  test("save", () => {
    const replacement = chronologyReplacer.replacement(context, context.file.document.querySelector("ul"))
  })
})
