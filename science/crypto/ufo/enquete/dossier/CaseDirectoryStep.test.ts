import { CaseDirectoryStep } from "./CaseDirectoryStep"
import { rr0TestUtil } from "../../../../../test/RR0TestUtil"
import { FileContents, SsgConfig, SsgContext } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { AllDataService } from "../../../../../data/AllDataService"
import { RR0Case } from "./RR0Case"
import path from "path"
import { CaseService } from "./CaseService"
import { TimeRenderer } from "../../../../../time/TimeRenderer"
import { TypedDataFactory } from "../../../../../data/TypedDataFactory"
import { RR0EventFactory } from "../../../../../event/RR0EventFactory"
import { TimeTextBuilder } from "../../../../../time/TimeTextBuilder"
import { TimeElementFactory } from "../../../../../time/TimeElementFactory"

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
    const dataService = new AllDataService([new TypedDataFactory<RR0Case>(eventFactory, "case")])
    const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    const timeRenderer = new TimeRenderer([], timeTextBuilder)
    const timeElementFactory = new TimeElementFactory(timeRenderer)
    const caseService = new CaseService(dataService, timeElementFactory)
    const step = new CaseDirectoryStep(caseService, [], [], "/science/crypto/ufo/enquete/dossier/index.html", config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(239)
  })
})
