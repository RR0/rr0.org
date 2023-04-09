import {PeopleReplacer} from "./PeopleReplacer"
import {rr0TestUtil} from "../test/RR0TestUtil"
import {PeopleFactory} from "./PeopleFactory"

describe("PeopleReplacer", () => {

  test("ignore brackets", () => {
    const replacer = new PeopleReplacer(new PeopleFactory(["people/h/HynekJosefAllen"]))
    const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
    expect(replacer.replacement(context, `<span class="people">Hynek, Josef Allen (Northwestern University, Evanston, Illinois</span>`, "Hynek, Josef Allen (Northwestern University, Evanston, Illinois"))
      .toBe(`<a href="/people/h/HynekJosefAllen/" title="Josef Allen Hynek" translate="no">Hynek, Josef Allen (Northwestern University, Evanston, Illinois</a>`)
    expect(replacer.replacement(context, `<span class="people">Josef Allen Hynek (Northwestern University, Evanston, Illinois</span>`, "Josef Allen Hynek (Northwestern University, Evanston, Illinois"))
      .toBe(`<a href="/people/h/HynekJosefAllen/" translate="no">Josef Allen Hynek (Northwestern University, Evanston, Illinois</a>`)
  })

  test("replace people tags", () => {
    const replacer = new PeopleReplacer(new PeopleFactory(["people/b/BeauJerome", "people/r/ReaganRonaldWilson"]))
    const context = rr0TestUtil.newContext("time/1/9/9/0/08/index.html", "")
    expect(replacer.replacement(context, `<span class="people" title="Ronald Wilson Reagan">Ronald Reagan</span>`, "Ronald Reagan")).toBe(`<a href="/people/r/ReaganRonaldWilson/" translate="no">Ronald Reagan</a>`)
    expect(replacer.replacement(context, `<span class="people">Jérôme Beau</span>`, "Jérôme Beau")).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
    expect(replacer.replacement(context, `<span class="people">Beau</span>`, "Beau")).toBe(`<a href="/people/b/BeauJerome/" title="Jérôme Beau" translate="no">Beau</a>`)
  })
})
