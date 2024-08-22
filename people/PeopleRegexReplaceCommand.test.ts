import { PeopleReplacerFactory } from "./PeopleReplacerFactory"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { ClassDomReplaceCommand } from "ssg-api"
import { describe, expect, test } from "@javarome/testscript"
import { PeopleService } from "./PeopleService"
import { AllDataService } from "../data/AllDataService"

describe("ClassDomReplaceCommand", () => {

  test("replaces", async () => {
    const command = new ClassDomReplaceCommand("people", new PeopleReplacerFactory(new PeopleService([],
      new AllDataService([], []), peopleFactory)))
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", `<span class="people">Jérôme Beau</span>`)
    const file = await command.execute(context)
    expect(file.contents).toBe(
      `<html><head></head><body><span title="1972-, 50 ans, France, ufologue, Informaticien" class="country-fr occupation-ufologist occupation-softwareEngineer" translate="no"><a href="/people/b/BeauJerome/">Jérôme Beau</a></span></body></html>`)
  })
})
