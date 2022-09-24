import {AnchorReplacer} from "./AnchorReplacer"
import {testUtil} from "../test/TestUtil"

describe("AnchorReplacer", () => {

  test("parse relative internal url", () => {
    const context = testUtil.newContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="Roswell">Roswell</a>`, "Roswell", undefined, "Roswell"))
      .toBe(`<a href="Roswell/">Roswell</a>`)
  })

  test("parse absolute internal file", () => {
    const context = testUtil.newContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="/Contact.html">Contact</a>`, "", "Contact.html", "Contact"))
      .toBe(`<a href="/Contact.html">Contact</a>`)
  })

  test("parse absolute internal url", () => {
    const context = testUtil.newContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="/time/pluies">pluies</a>`, "/time/pluies", undefined, "pluies"))
      .toBe(`<a href="/time/pluies/">pluies</a>`)
  })

  test("parse absolute external url", () => {
    const context = testUtil.newContext("/science/crypto/ufo/enquete/dossier", "")
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="https://wikipedia.org">Wikipedia</a>`, "https://wikipedia.org", undefined, "Wikipedia"))
      .toBe(`<a href="https://wikipedia.org" target="_blank">Wikipedia</a>`)
  })
})
