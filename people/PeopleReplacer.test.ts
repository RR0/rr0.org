import { PeopleReplacer } from "./PeopleReplacer"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { PeopleService } from "./PeopleService"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { describe, expect, test } from "@javarome/testscript"
import { AllDataService } from "../data/AllDataService"
import { TypedDataFactory } from "../data/TypedDataFactory"

describe("PeopleReplacer", () => {

  const peopleFactory = new TypedDataFactory("people")

  function createPeopleElement(context: HtmlRR0SsgContext, content: string, title?: string): HTMLSpanElement {
    const peopleElement = context.file.document.createElement("span") as HTMLSpanElement
    peopleElement.textContent = content
    if (title) {
      peopleElement.title = title
    }
    return peopleElement
  }

  test("ignore brackets", async () => {
    const dirs = ["people/h/HynekJosefAllen"]
    const dataService = new AllDataService([peopleFactory])
    const replacer = new PeopleReplacer(new PeopleService(dirs, dataService, peopleFactory))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    {
      const lastnameFirstElement = createPeopleElement(context,
        "Hynek, Josef Allen (Northwestern University, Evanston, Illinois)")
      const replacement = await replacer.replacement(context, lastnameFirstElement)
      expect(replacement.outerHTML).toBe(
        `<span title="1910-1986, 76 ans, USA, ufologue, astronome" class="deceased country-us occupation-ufologist occupation-astronomer" translate="no"><a href="/people/h/HynekJosefAllen/">Hynek, Josef Allen (Northwestern University, Evanston, Illinois)</a></span>`)
    }
    {
      const firstnameFirstElement = createPeopleElement(context,
        "Josef Allen Hynek (Northwestern University, Evanston, Illinois)")
      const replacement = await replacer.replacement(context, firstnameFirstElement)
      expect(replacement.outerHTML).toBe(
        `<span title="1910-1986, 76 ans, USA, ufologue, astronome" class="deceased country-us occupation-ufologist occupation-astronomer" translate="no"><a href="/people/h/HynekJosefAllen/">Josef Allen Hynek (Northwestern University, Evanston, Illinois)</a></span>`)
    }
  })

  test("replace people tags", async () => {
    const dirs = ["people/b/BeauJerome", "people/r/ReaganRonald"]
    const dataService = new AllDataService([peopleFactory])
    const replacer = new PeopleReplacer(
      new PeopleService(dirs, dataService, peopleFactory))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    {
      const peopleWithTitle = createPeopleElement(context, "Ronald Reagan", "Ronald Wilson Reagan")
      let replacement = await replacer.replacement(context, peopleWithTitle)
      expect(replacement.outerHTML).toBe(
        `<span translate="no"><a href="/people/r/ReaganRonald/">Ronald Reagan</a></span>`)
    }
    {
      const peopleWithFullName = createPeopleElement(context, "Jérôme Beau")
      let replacement = await replacer.replacement(context, peopleWithFullName)
      expect(replacement.outerHTML).toBe(
        `<span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no"><a href="/people/b/BeauJerome/">Jérôme Beau</a></span>`)
    }
    {
      const peopleWithLastName = createPeopleElement(context, "Beau")
      let replacement = await replacer.replacement(context, peopleWithLastName)
      expect(replacement.outerHTML).toBe(
        `<span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no" title="Jérôme Beau"><a href="/people/b/BeauJerome/" title="Jérôme Beau">Beau</a></span>`)
    }
  })
})
