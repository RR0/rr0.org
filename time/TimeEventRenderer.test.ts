import { describe, expect, test } from "@javarome/testscript"
import { RR0CaseRenderer } from "./RR0CaseRenderer"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { NamedPlace, RR0Case } from "./RR0Case"
import { Place } from "../place/Place"
import { OnlineSource } from "../source/OnlineSource"
import { franceCity } from "../org/eu/fr/FranceCity"


describe("TimeEventRenderer", () => {

  const renderer = new RR0CaseRenderer()

  test("render event", () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    const city = franceCity(92000, Place.fromLocation(48.891944, 2.207222))
    const dep = city.departement
    const villeMessages = context.messages.country.fr.region[dep.region.code].department[dep.code].ville[city.zipCode]
    const namedPlace: NamedPlace = {
      place: city.places[0],
      name: villeMessages.toTitle(context, city)
    }
    const source1 = new OnlineSource("https://somesite.com/case1", "Case 1", ["Some Author"],
      {time: context.time.toString(), publisher: "Some site"})
    const sources = [source1]
    const c = new RR0Case(context.time, namedPlace, "some sighting", sources)
    const elem = renderer.render(context, c)
    expect(elem.innerHTML).toBe(
      `<time>1970-03</time> À <span class="place">Nanterre (Hauts-de-Seine, France)</span>, some sighting <span class="source">Some Author: <span><a href="https://somesite.com/case1">Case 1</a>, <i>Some site</i>, 1970-03</span></span>`)
  })
})
