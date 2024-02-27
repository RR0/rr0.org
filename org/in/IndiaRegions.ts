import { RegionCode_in } from "./RegionCode_in"
import { Place } from "../../place/Place"
import { india } from "./Country_in"
import { Region } from "../country/region/Region"

function createRegion_in(code: RegionCode_in, place: Place) {
  return new Region(code, india, [place], `${india.code}/${code}`)
}

export const indiaRegions = {
  Telangana: createRegion_in(RegionCode_in.Telangana, Place.fromLocation(47.466667, 0.833333)),
  Maharashtra: createRegion_in(RegionCode_in.Maharashtra, Place.fromLocation(47.466667, 0.833333))
}
