import {CaseDirectoryStep} from "./CaseDirectoryStep"
import {rr0TestUtil} from "../../../../../test/RR0TestUtil"
import {SsgConfig, SsgContext, SsgFile} from "ssg-api"

describe("DirectoryStep", () => {

  const config: SsgConfig = {
    outDir: "out"
  }

  async function outputFunc(context: SsgContext, info: SsgFile, oudDir = config.outDir + "/"): Promise<void> {
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
    const step = new CaseDirectoryStep(
      ["/science/crypto/ufo/enquete/dossier/*/"],
      [],
      "/science/crypto/ufo/enquete/dossier/index.html",
      outputFunc, config)
    const stepResult = await step.execute(context)
    expect(stepResult.directoryCount).toBe(239)
  })
})
