import { describe, expect, test } from "@javarome/testscript"
import { CaseSummaryRenderer } from "./CaseSummaryRenderer"
import { rr0TestUtil } from "../test/RR0TestUtil"
import { Place } from "../place/Place"
import { franceCity } from "../org/eu/fr/region/FranceCity"
import { NamedPlace, RR0CaseSummary } from "./datasource/rr0/RR0CaseSummary"
import { TimeContext } from "./TimeContext"
import { SourceRenderer } from "../source/SourceRenderer"
import { Source } from "../source/Source"
import { SourceFactory } from "../source/SourceFactory"
import { NoteRenderer } from "../note/NoteRenderer"
import { NoteFileCounter } from "../note/NoteFileCounter"
import { AllDataService } from "../data/AllDataService"
import { HttpSource } from "./datasource/HttpSource"
import { TimeTextBuilder } from "./TimeTextBuilder"

describe("TimeEventRenderer", () => {

  const dataService = new AllDataService([])
  const baseUrl = "https://rr0.org"
  const http = new HttpSource()
  const sourceFactory = new SourceFactory(dataService, http, baseUrl, rr0TestUtil.intlOptions)
  const textBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
  const renderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
    new SourceRenderer(textBuilder))

  test("render event", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    const city = franceCity(92000, Place.fromLocation(48.891944, 2.207222))
    const dep = city.parent
    const villeMessages = context.messages.country.fr.region[dep.parent.id].department[dep.id].city[city.id]
    const namedPlace: NamedPlace = {
      place: city.places[0],
      name: villeMessages.toTitle(context, city)
    }
    const source1: Source = {
      events: [], previousSourceRefs: [],
      url: "https://somesite.com/case1",
      title: "Case 1",
      authors: ["Some Author"],
      publication: {
        publisher: "Some site",
        time: TimeContext.fromDate(new Date(2001, 12, 13))
      }
    }
    const sources = [source1]
    const c: RR0CaseSummary = {
      events: [], type: "case",
      time: context.time,
      place: namedPlace,
      description: "some sighting", sources
    }
    const elem = await renderer.render(context, c)
    expect(elem.innerHTML).toBe(
      `<time>1970-03</time> À <span class="place">Nanterre (Hauts-de-Seine, France)</span>, some sighting <span class="source">Some Author: <span><a href="https://somesite.com/case1">Case 1</a>, <i>Some site</i>, 1970-03</span></span>`)
  })
})
