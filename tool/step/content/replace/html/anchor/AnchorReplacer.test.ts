import {AnchorReplacer} from "./AnchorReplacer"
import {testUtil} from "../../../../../test/TestUtil"

describe("AnchorReplacer", () => {

  test("parse relative internal url", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = new HTMLAnchorElement()
    a.href = "Roswell"
    a.textContent = "Roswell"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe(null)
  })

  test("parse absolute internal file", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = new HTMLAnchorElement()
    a.href = "/Contact.html"
    a.textContent = "Contact"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe(null)
  })

  test("parse absolute internal url", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = new HTMLAnchorElement()
    a.href = "/time/pluies"
    a.textContent = "pluies"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe(null)
  })

  test("parse absolute external url", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = new HTMLAnchorElement()
    a.href = "https://wikipedia.org"
    a.textContent = "Wikipedia"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe(null)
  })
})
