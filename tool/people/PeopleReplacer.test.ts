import {PeopleReplacer} from "./PeopleReplacer"
import {testUtil} from "../test/TestUtil"

describe("PeopleReplacer", () => {

  test("build url", () => {
    const replacer = new PeopleReplacer([])
    expect(replacer.getUrl("Beau", ["Jérôme"])).toBe("people/b/BeauJerome")
    expect(replacer.getUrl("Beau", ["Jérôme", "Pierre"])).toBe("people/b/BeauJeromePierre")
    expect(replacer.getUrl("VonBraun", ["Werner"])).toBe("people/v/VonBraunWerner")
  })

  test("build people with one first name", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJerome"])
    expect(replacer.getPeople("Jérôme Beau")).toEqual({
      lastName: "Beau",
      firstNames: ["Jérôme"],
      url: "people/b/BeauJerome"
    })
  })

  test("build people with two first names", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJeromePierre"])
    expect(replacer.getPeople("Jérôme Pierre Beau")).toEqual({
      lastName: "Beau",
      firstNames: ["Jérôme", "Pierre"],
      url: "people/b/BeauJeromePierre"
    })
  })

  test("build people with two last names", () => {
    const replacer = new PeopleReplacer(["people/v/VonBraunWerner"])
    expect(replacer.getPeople("Werner VonBraun")).toEqual({
      lastName: "VonBraun",
      firstNames: ["Werner"],
      url: "people/v/VonBraunWerner"
    })
  })

  test("build people with one initial first names", () => {
    const replacer = new PeopleReplacer(["people/c/CondonEdwardU"])
    expect(replacer.getPeople("Edward U. Condon")).toEqual({
      lastName: "Condon",
      firstNames: ["Edward", "U."],
      url: "people/c/CondonEdwardU"
    })
  })

  test("build people with last name first", () => {
    const replacer = new PeopleReplacer(["people/h/HynekJosefAllen"])
    expect(replacer.getPeople("Hynek, Josef Allen")).toEqual({
      lastName: "Hynek",
      firstNames: ["Josef", "Allen"],
      url: "people/h/HynekJosefAllen"
    })
  })

  test("Single name", () => {
    const replacer = new PeopleReplacer(["people/a/Aristote"])
    expect(replacer.getPeople("Aristote")).toEqual({
      lastName: "Aristote",
      firstNames: [],
      url: "people/a/Aristote"
    })
  })

  test("ignore brackets", () => {
    const replacer = new PeopleReplacer(["people/h/HynekJosefAllen"])
    const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
    expect(replacer.replacement(context, `<span class="people">Hynek, Josef Allen (Northwestern University, Evanston, Illinois</span>`, "Hynek, Josef Allen (Northwestern University, Evanston, Illinois"))
      .toBe(`<a href="/people/h/HynekJosefAllen/" title="Josef Allen Hynek" translate="no">Hynek, Josef Allen (Northwestern University, Evanston, Illinois</a>`)
    expect(replacer.replacement(context, `<span class="people">Josef Allen Hynek (Northwestern University, Evanston, Illinois</span>`, "Josef Allen Hynek (Northwestern University, Evanston, Illinois"))
      .toBe(`<a href="/people/h/HynekJosefAllen/" translate="no">Josef Allen Hynek (Northwestern University, Evanston, Illinois</a>`)
  })

  test("replace people tags", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJerome", "people/r/ReaganRonaldWilson"])
    const context = testUtil.newContext("people/1/9/9/0/08/index.html", "")
    expect(replacer.replacement(context, `<span class="people" title="Ronald Wilson Reagan">Ronald Reagan</span>`, "Ronald Reagan")).toBe(`<a href="/people/r/ReaganRonaldWilson/" translate="no">Ronald Reagan</a>`)
    expect(replacer.replacement(context, `<span class="people">Jérôme Beau</span>`, "Jérôme Beau")).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
    expect(replacer.replacement(context, `<span class="people">Beau</span>`, "Beau")).toBe(`<a href="/people/b/BeauJerome/" title="Jérôme Beau" translate="no">Beau</a>`)
  })
})
