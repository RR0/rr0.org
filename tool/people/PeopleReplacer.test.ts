import {SsgContext} from "../SsgContext"
import {PeopleReplacer} from "./PeopleReplacer"

describe("PeopleReplacer", () => {

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
      name: "people/1/9/9/0/08/index.html"
    }
    return context
  }

  test("build url", () => {
    const replacer = new PeopleReplacer(["people/2/0/0/3"])
    expect(replacer.getUrl("Beau", ["Jérôme"])).toBe("people/b/BeauJerome")
    expect(replacer.getUrl("Beau", ["Jérôme", "Pierre"])).toBe("people/b/BeauJeromePierre")
    expect(replacer.getUrl("VonBraun", ["Werner"])).toBe("people/v/VonBraunWerner")
  })

  test("build people", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJerome", "people/b/BeauJeromePierre", "people/v/VonBraunWerner"])
    expect(replacer.getPeople("Jérôme Beau")).toEqual({
      lastName: "Beau",
      firstNames: ["Jérôme"],
      url: "people/b/BeauJerome"
    })
    expect(replacer.getPeople("Jérôme Pierre Beau")).toEqual({
      lastName: "Beau",
      firstNames: ["Jérôme", "Pierre"],
      url: "people/b/BeauJeromePierre"
    })
    expect(replacer.getPeople("Werner VonBraun")).toEqual({
      lastName: "VonBraun",
      firstNames: ["Werner"],
      url: "people/v/VonBraunWerner"
    })
  })

  test("replace people tags", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJerome"])
    const context = newContext()
    expect(replacer.replacement(context, "Jérôme Beau", "Jérôme Beau")).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
    expect(replacer.replacement(context, "Beau", "Beau")).toBe(`<a href="/people/b/BeauJerome/" title="Jérôme Beau" translate="no">Beau</a>`)
  })
})
