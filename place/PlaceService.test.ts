import {GooglePlaceService} from "./GooglePlaceService"
import { describe, expect, test, beforeEach, beforeAll } from '@javarome/testscript';

describe("PlaceService", () => {

  let apiKey: any

  beforeAll(() => {
    apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      throw Error("GOOGLE_MAPS_API_KEY is required")
    }
  })

  let service: GooglePlaceService

  beforeEach(() => {
    service = new GooglePlaceService("place", apiKey)
  })

  const lanlPosition = {"lat": 35.8440582, "lng": -106.287162}
  const lanlElevation = 2161.025390625

  test("build place with one first name", async () => {
    const laln = await service.get("LANL")
    expect(laln?.location).toEqual(lanlPosition)
    expect(laln?.elevation?.elevation).toBe(lanlElevation)
  })

  test("read", async () => {
    const fileName = service.getFileName(lanlPosition)
    const result = await service.read(fileName)
    expect(result.location).toEqual(lanlPosition)
    expect(result.elevation?.elevation).toBe(lanlElevation)
  })
})
