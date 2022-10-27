import {PlaceReplacer} from "./PlaceReplacer"
import {CountryCode} from "../../../../../model/place/CountryCode"
import {PlaceService} from "../../../../../model/place/PlaceService"
import {testUtil} from "../../../../../test/TestUtil"

describe("PlaceReplacer", () => {

  test("build place with one first name", async () => {
    const service = new PlaceService(["place/amer/n/OakRidge"])
    const replacer = new PlaceReplacer(service)
    const context = testUtil.newHtmlContext("place/amer/n/OakRidge/index.html", "")
    const doc = context.inputFile.dom.window.document
    const placeTag = doc.createElement("span")
    placeTag.className = "place"
    placeTag.innerHTML = "Oak Ridge (Tennessee)"
    expect(await replacer.replacement(context, placeTag)).toEqual({
      title: "Oak Ridge (Tennessee)",
      location: {
        lat: 36.0103561,
        lng: -84.26964490000002
      },
      country: CountryCode.us
    })
  })

})
