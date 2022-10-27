import {PlaceService} from "./PlaceService"

describe("PlaceService", () => {

  test("build place with one first name", async () => {
    const service = new PlaceService()
    expect(await service.get("LANL")).toEqual({
      dirName: "org/us/state/nm/LANL",
      location: {
        "lat": 35.8440582,
        "lng": -106.287162
      },
      state: {
        code: "nm",
        dirName: "org/us/state/nm/"
      },
      title: "LANL"
    })
  })

  test("read", async () => {
    const service = new PlaceService()
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
