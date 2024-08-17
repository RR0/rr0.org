import { CaseDirectoryStep } from "./CaseDirectoryStep"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil"
import { FileContents, SsgConfig, SsgContext } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { DataService } from "../../../../../data/DataService"
import { RR0Case } from "./RR0Case"
import path from "path"
import { CaseService } from "./CaseService"
import { TimeReplacer } from "../../../../../time/TimeReplacer"
import { TimeRenderer } from "../../../../../time/TimeRenderer"
import { DefaultDataFactory } from "../../../../../data/DefaultDataFactory"
import { RR0EventFactory } from "../../../../../event/RR0EventFactory"
import { TimeTextBuilder } from "../../../../../time/TimeTextBuilder"

describe("DirectoryStep", () => {

  const outDir = "out"

  const config: SsgConfig = {
    getOutputPath(context: SsgContext): string {
      return path.join(outDir, context.file.name)
    }
  }

  async function outputFunc(context: SsgContext, info: FileContents, oudDir = outDir + "/"): Promise<void> {
    info.name = `${oudDir}${info.name}`
  }

  test("", async () => {
    const template = `
<!--#include virtual="/header-start.html" -->
<title>Dossiers ufologiques</title>
<!--#include virtual="/header-end.html" -->
<p>Before</p>
<!--#echo var="directories" -->
<p>After</p>
<!--#include virtual="/footer.html" -->`
    const context = rr0TestUtil.newContext("/science/crypto/ufo/enquete/dossier/index.html", template)
    const eventFactory = new RR0EventFactory()
    const dataService = new DataService([new DefaultDataFactory<RR0Case>(eventFactory, "case")])
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const timeRenderer = new TimeRenderer([], timeTextBuilder)
    const timeReplacer = new TimeReplacer(timeRenderer)
    const caseService = new CaseService(dataService, timeReplacer)
    const step = new CaseDirectoryStep(caseService, [], [], "/science/crypto/ufo/enquete/dossier/index.html",
      outputFunc, config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(239)
  })
})
