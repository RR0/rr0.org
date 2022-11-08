import {PeopleReplacer} from "./PeopleReplacer"
import {rr0TestUtil} from "../test/RR0TestUtil"

describe("PeopleReplacer", () => {

  test("build people with one first name", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJerome"])
    expect(replacer.getPeople("Jérôme Beau")).toEqual({
      title: "Beau, Jérôme",
      countries: [],
      lastName: "Beau",
      firstNames: ["Jérôme"],
      hoax: false,
      dirName: "people/b/BeauJerome",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with two first names", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJeromePierre"])
    expect(replacer.getPeople("Jérôme Pierre Beau")).toEqual({
      title: "Beau, Jérôme Pierre",
      countries: [],
      lastName: "Beau",
      firstNames: ["Jérôme", "Pierre"],
      hoax: false,
      dirName: "people/b/BeauJeromePierre",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with two last names", () => {
    const replacer = new PeopleReplacer(["people/v/VonBraunWerner"])
    expect(replacer.getPeople("Werner VonBraun")).toEqual({
      title: "Von Braun, Werner",
      countries: [],
      lastName: "VonBraun",
      firstNames: ["Werner"],
      hoax: false,
      dirName: "people/v/VonBraunWerner",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with one initial first names", () => {
    const replacer = new PeopleReplacer(["people/c/CondonEdwardU"])
    expect(replacer.getPeople("Edward U. Condon")).toEqual({
      title: "Condon, Edward U.",
      countries: [],
      lastName: "Condon",
      firstNames: ["Edward", "U."],
      hoax: false,
      dirName: "people/c/CondonEdwardU",
      occupations: [],
      pseudonyms: []
    })
  })

  test("build people with last name first", () => {
    const replacer = new PeopleReplacer(["people/h/HynekJosefAllen"])
    expect(replacer.getPeople("Hynek, Josef Allen")).toEqual({
      title: "Hynek, Josef Allen",
      countries: [],
      lastName: "Hynek",
      firstNames: ["Josef", "Allen"],
      hoax: false,
      dirName: "people/h/HynekJosefAllen",
      occupations: [],
      pseudonyms: []
    })
  })

  test("Single name", () => {
    const replacer = new PeopleReplacer(["people/a/Aristote"])
    expect(replacer.getPeople("Aristote")).toEqual({
      title: "Aristote",
      countries: [],
      lastName: "Aristote",
      firstNames: [],
      hoax: false,
      dirName: "people/a/Aristote",
      occupations: [],
      pseudonyms: []
    })
  })

  test("ignore brackets", () => {
    const replacer = new PeopleReplacer(["people/h/HynekJosefAllen"])
    const context = rr0TestUtil.newContext("people/1/9/9/0/08/index.html", "")
    expect(replacer.replacement(context, `<span class="people">Hynek, Josef Allen (Northwestern University, Evanston, Illinois</span>`, "Hynek, Josef Allen (Northwestern University, Evanston, Illinois"))
      .toBe(`<a href="/people/h/HynekJosefAllen/" title="Josef Allen Hynek" translate="no">Hynek, Josef Allen (Northwestern University, Evanston, Illinois</a>`)
    expect(replacer.replacement(context, `<span class="people">Josef Allen Hynek (Northwestern University, Evanston, Illinois</span>`, "Josef Allen Hynek (Northwestern University, Evanston, Illinois"))
      .toBe(`<a href="/people/h/HynekJosefAllen/" translate="no">Josef Allen Hynek (Northwestern University, Evanston, Illinois</a>`)
  })

  test("replace people tags", () => {
    const replacer = new PeopleReplacer(["people/b/BeauJerome", "people/r/ReaganRonaldWilson"])
    const context = rr0TestUtil.newContext("people/1/9/9/0/08/index.html", "")
    expect(replacer.replacement(context, `<span class="people" title="Ronald Wilson Reagan">Ronald Reagan</span>`, "Ronald Reagan")).toBe(`<a href="/people/r/ReaganRonaldWilson/" translate="no">Ronald Reagan</a>`)
    expect(replacer.replacement(context, `<span class="people">Jérôme Beau</span>`, "Jérôme Beau")).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
    expect(replacer.replacement(context, `<span class="people">Beau</span>`, "Beau")).toBe(`<a href="/people/b/BeauJerome/" title="Jérôme Beau" translate="no">Beau</a>`)
  })
})
