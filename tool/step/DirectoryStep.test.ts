import {DirectoryStep} from "./DirectoryStep"
import {SsgContext} from "../SsgContext"
import {testUtil} from "../test/TestUtil"
import {SsgConfig} from "../Ssg"
import {FileInfo} from "../util/file/FileInfo"
import {CaseDirectoryStep} from "./CaseDirectoryStep"

describe("DirectoryStep", () => {

  const config: SsgConfig = {
    outDir: "out"
  }

  async function outputFunc(context: SsgContext, info: FileInfo, oudDir = config.outDir + "/"): Promise<void> {
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
    const context = testUtil.newContext("science/crypto/ufo/enquete/dossier/index.html", template)
    const step = new CaseDirectoryStep(
      ["science/crypto/ufo/enquete/dossier/*/"],
      [],
      "science/crypto/ufo/enquete/dossier/index.html",
      outputFunc)
    const stepResult = await step.execute(context, config)
    expect(stepResult.directoryCount).toBe(239)
  })
})
