import {testUtil} from "../../../../test/TestUtil"
import {FileInfo} from "../../../../util/file/FileInfo"
import {HtAccessToNetlifyConfigReplaceCommand} from "./HtAccessToNetlifyConfigReplaceCommand"

describe("HtAccessToNetlifyConfigReplaceCommand", () => {

  test("redirect html file to html file", async () => {
    const command = new HtAccessToNetlifyConfigReplaceCommand("https://rr0.org/")
    const context = testUtil.newContext(".htaccess",
      `Redirect /Documents/Articles/Vallee/1990_5ArgumentsContreHET_Vallee_fr.html https://rr0.org/time/1/9/9/0/Vallee_5ArgumentsAgainstTheExtraterrestrialOriginOfUnidentifiedFlyingObjects/index_fr.html`)
    const inputFile = context.inputFile
    context.outputFile = new FileInfo("out/.netlify.toml", inputFile.encoding, "", inputFile.lastModified,
      inputFile.lang)
    const file = await command.execute(context)
    expect(file.contents).toBe(`[[redirects]]
  from = "/Documents/Articles/Vallee/1990_5ArgumentsContreHET_Vallee_fr.html"
  to = "/time/1/9/9/0/Vallee_5ArgumentsAgainstTheExtraterrestrialOriginOfUnidentifiedFlyingObjects/index_fr.html"

`)
  })

  test("redirect directory to directory", async () => {
    const command = new HtAccessToNetlifyConfigReplaceCommand("https://rr0.org/")
    const context = testUtil.newContext(".htaccess",
      `Redirect /science/crypto/ufologie https://rr0.org/science/crypto/ufo`)
    const inputFile = context.inputFile
    context.outputFile = new FileInfo("out/.netlify.toml", inputFile.encoding, "", inputFile.lastModified,
      inputFile.lang)
    const file = await command.execute(context)
    expect(file.contents).toBe(`[[redirects]]
  from = "/science/crypto/ufologie/*"
  to = "/science/crypto/ufo/:splat"

`)
  })

  describe("redirect directory to directory", () => {

    test("with trailing slash", async () => {
      const command = new HtAccessToNetlifyConfigReplaceCommand("https://rr0.org/")
      const context = testUtil.newContext(".htaccess",
        `Redirect /science/crypto/ufo/analyse/hypotheses/HET/ https://rr0.org/science/crypto/ufo/analyse/hypotheses/intelligence/HET/`)
      const inputFile = context.inputFile
      context.outputFile = new FileInfo("out/.netlify.toml", inputFile.encoding, "",
        inputFile.lastModified, inputFile.lang)
      const file = await command.execute(context)
      expect(file.contents).toBe(`[[redirects]]
  from = "/science/crypto/ufo/analyse/hypotheses/HET/*"
  to = "/science/crypto/ufo/analyse/hypotheses/intelligence/HET/:splat"

`)
    })

    test("without trailing slash", async () => {
      const command = new HtAccessToNetlifyConfigReplaceCommand("https://rr0.org/")
      const context = testUtil.newContext(".htaccess",
        `Redirect /science/crypto/ufologie https://rr0.org/science/crypto/ufo`)
      const inputFile = context.inputFile
      context.outputFile = new FileInfo("out/.netlify.toml", inputFile.encoding, "",
        inputFile.lastModified, inputFile.lang)
      const file = await command.execute(context)
      expect(file.contents).toBe(`[[redirects]]
  from = "/science/crypto/ufologie/*"
  to = "/science/crypto/ufo/:splat"

`)
    })
  })
})
