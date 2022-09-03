import {SsgContext} from "../SsgContext"
import {AnchorReplacer} from "./AnchorReplacer"

describe("AnchorReplacer", () => {

  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }

  function newContext() {
    const context = new SsgContext("fr", intlOptions)
    context.currentFile = {
      contents: "", encoding: "utf8", lastModified: new Date(),
      name: "time/1/9/9/0/08/index.html"
    }
    return context
  }

  test("parse relative internal url", () => {
    const context = newContext()
    context.currentFile = {
      contents: "", encoding: "utf8", lastModified: new Date(),
      name: "/science/crypto/ufo/enquete/dossier"
    }
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="Roswell">Roswell</a>`, "Roswell", undefined, "Roswell"))
      .toBe(`<a href="Roswell/">Roswell</a>`)
  })

  test("parse absolute internal file", () => {
    const context = newContext()
    context.currentFile = {
      contents: "", encoding: "utf8", lastModified: new Date(),
      name: "/science/crypto/ufo/enquete/dossier"
    }
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="/Contact.html">Contact</a>`, "", "Contact.html", "Contact"))
      .toBe(`<a href="/Contact.html">Contact</a>`)
  })

  test("parse absolute internal url", () => {
    const context = newContext()
    context.currentFile = {
      contents: "", encoding: "utf8", lastModified: new Date(),
      name: "/science/crypto/ufo/enquete/dossier"
    }
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="/time/pluies">pluies</a>`, "/time/pluies", undefined, "pluies"))
      .toBe(`<a href="/time/pluies/">pluies</a>`)
  })

  test("parse absolute external url", () => {
    const context = newContext()
    context.currentFile = {
      contents: "", encoding: "utf8", lastModified: new Date(),
      name: "/science/crypto/ufo/enquete/dossier"
    }
    const replacer = new AnchorReplacer()
    expect(replacer.replacement(context, `<a href="https://wikipedia.org">Wikipedia</a>`, "https://wikipedia.org", undefined, "Wikipedia"))
      .toBe(`<a href="https://wikipedia.org" target="_blank">Wikipedia</a>`)
  })
})
