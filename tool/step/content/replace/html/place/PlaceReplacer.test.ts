import {PlaceReplacer} from "./PlaceReplacer"
import {PlaceService} from "../../../../../model/place/PlaceService"
import {testUtil} from "../../../../../test/TestUtil"
import {Elevation, Place, PlaceLocation} from "../../../../../model/place/Place"
import {OrganizationService} from "../../../../../model/org/OrganizationService"

describe("PlaceReplacer", () => {

  test("replace a place tag", async () => {
    const service = new PlaceService()
    await service.read("place/amer/n/OakRidge")
    const replacer = new PlaceReplacer(service)
    const context = testUtil.newHtmlContext("place/amer/n/OakRidge/index.html", "")
    const doc = context.inputFile.dom.window.document
    const placeTag = doc.createElement("span")
    placeTag.className = "place"
    placeTag.innerHTML = "Oak Ridge (Tennessee)"
    const replacement = await replacer.replacement(context, placeTag)
    expect(replacement.tagName).toEqual("SPAN")
    expect(replacement.textContent).toEqual("Oak Ridge (Tennessee)")
  })

})
