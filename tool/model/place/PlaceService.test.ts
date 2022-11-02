import {PlaceService} from "./PlaceService"
import {GooglePlaceService} from "./GooglePlaceService"

describe("PlaceService", () => {

  let apiKey: any

  beforeAll(() => {
    apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      throw Error("GOOGLE_MAPS_API_KEY is required")
    }
  })

  xtest("build place with one first name", async () => {
    const service = new GooglePlaceService("place", apiKey)
    const laln = await service.get("LANL")
    expect(laln).toEqual({
      dirName: "",
      location: {
        "lat": 35.8440582,
        "lng": -106.287162
      },
      state: {
        code: "nm"
      },
      title: "LANL"
    })
  })

  xtest("read", async () => {
    const service = new GooglePlaceService("place", apiKey)
    expect(await service.read("org/us/state/nm/LosAlamosNationalLaboratories")).toEqual({
      "dirName": "org/us/state/nm/LosAlamosNationalLaboratories",
      "location": {
        "lat": 35.8440582,
        "lng": -106.287162
      },
      "state": {
        "code": "nm",
        "dirName": "org/us/state/nm/"
      },
      "title": "Los Alamos National Laboratories"
    })
  })

})
