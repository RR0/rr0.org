import {AnchorReplacer} from "./AnchorReplacer"
import {testUtil} from "../../../../../test/TestUtil"

const jsdom = require("jsdom")
const {JSDOM} = jsdom

describe("AnchorReplacer", () => {

  let document: Document

  beforeEach(() => {
    document = new JSDOM().window.document
  })

  test("parse relative internal url", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = document.createElement("a")
    a.href = "Roswell"
    a.textContent = "Roswell"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe("")
    expect(replaced.href).toBe("Roswell/")
  })

  test("parse absolute internal file", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = document.createElement("a")
    a.href = "/Contact.html"
    a.textContent = "Contact"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe("")
    expect(replaced.href).toBe("/Contact.html")
  })

  test("parse absolute internal url", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = document.createElement("a")
    a.href = "/time/pluies"
    a.textContent = "pluies"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe("")
    expect(replaced.href).toBe("/time/pluies/")
  })

  test("parse absolute external url", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = document.createElement("a")
    a.href = "https://wikipedia.org"
    a.textContent = "Wikipedia"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.target).toBe("_blank")
    expect(replaced.href).toBe("https://wikipedia.org/")
  })

  test("parse url with anchor", async () => {
    const context = testUtil.newHtmlContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer("https://rr0.org/")
    const a = document.createElement("a")
    a.href = "enquete/dossier/11Septembre/WTC/crashes#passeport"
    a.textContent = "Passeports"
    const replaced = (await replacer.replacement(context, a)) as HTMLAnchorElement
    expect(replaced.href).toBe("enquete/dossier/11Septembre/WTC/crashes#passeport")
    expect(replaced.target).toBe("")
  })
})
