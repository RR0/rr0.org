import {PeopleReplacer} from "./PeopleReplacer"
import {rr0TestUtil} from "../test/RR0TestUtil"
import {PeopleFactory} from "./PeopleFactory"
import {HtmlRR0SsgContext} from "../RR0SsgContext"

describe("PeopleReplacer", () => {

  function createPeopleElement(context: HtmlRR0SsgContext, content: string, title?: string): HTMLSpanElement {
    const peopleElement = context.inputFile.document.createElement("span") as HTMLSpanElement
    peopleElement.textContent = content
    if (title) {
      peopleElement.title = title
    }
    return peopleElement
  }

  test("ignore brackets", async () => {
    const replacer = new PeopleReplacer(new PeopleFactory(["people/h/HynekJosefAllen"]))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    {
      const lastnameFirstElement = createPeopleElement(context,
        "Hynek, Josef Allen (Northwestern University, Evanston, Illinois)")
      const replacement = await replacer.replacement(context, lastnameFirstElement)
      expect(replacement.outerHTML).toBe(
        `<a href="/people/h/HynekJosefAllen/" title="Josef Allen Hynek" translate="no">Hynek, Josef Allen (Northwestern University, Evanston, Illinois)</a>`)
    }
    {
      const firstnameFirstElement = createPeopleElement(context,
        "Josef Allen Hynek (Northwestern University, Evanston, Illinois)")
      const replacement = await replacer.replacement(context, firstnameFirstElement)
      expect(replacement.outerHTML).toBe(
        `<a href="/people/h/HynekJosefAllen/" translate="no">Josef Allen Hynek (Northwestern University, Evanston, Illinois)</a>`)
    }
  })

  test("replace people tags", async () => {
    const replacer = new PeopleReplacer(new PeopleFactory(["people/b/BeauJerome", "people/r/ReaganRonaldWilson"]))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    {
      const peopleWithTitle = createPeopleElement(context, "Ronald Reagan", "Ronald Wilson Reagan")
      let replacement = await replacer.replacement(context, peopleWithTitle)
      expect(replacement.outerHTML).toBe(`<a href="/people/r/ReaganRonaldWilson/" translate="no">Ronald Reagan</a>`)
    }
    {
      const peopleWithFullName = createPeopleElement(context, "Jérôme Beau")
      let replacement = await replacer.replacement(context, peopleWithFullName)
      expect(replacement.outerHTML).toBe(`<a href="/people/b/BeauJerome/" translate="no">Jérôme Beau</a>`)
    }
    {
      const peopleWithLastName = createPeopleElement(context, "Beau")
      let replacement = await replacer.replacement(context, peopleWithLastName)
      expect(replacement.outerHTML).toBe(`<a href="/people/b/BeauJerome/" title="Jérôme Beau" translate="no">Beau</a>`)
    }
  })
})
