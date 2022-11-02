import {PlaceReplacer} from "./PlaceReplacer"
import {PlaceService} from "../../../../../model/place/PlaceService"
import {testUtil} from "../../../../../test/TestUtil"
import {Elevation, Place, PlaceLocation} from "../../../../../model/place/Place"
import {OrganizationService} from "../../../../../model/org/OrganizationService"

describe("PlaceReplacer", () => {

  test("replace a place tag", async () => {
    const location = {lat: 35.8440582, lng: -106.287162}
    const elevation = {elevation: 2161.025390625}
    const placeService = new class extends PlaceService {
      async read(fileName: string): Promise<Place> {
        return new Place(location, elevation, "")
      }

      protected async geocode(address: string): Promise<{ location: PlaceLocation; data: any } | undefined> {
        return {location, data: {}}
      }

      protected async elevation(location: PlaceLocation): Promise<Elevation> {
        return elevation
      }
    }("place")
    const orgService = new class extends OrganizationService {
    }("org")
    await placeService.read("place/loc35.8440582_-106.287162.json")
    const replacer = new PlaceReplacer(placeService, orgService)
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
