import { IndiaRegionCode } from "./IndiaRegionCode"
import { Place } from "../../place/Place"
import { india } from "./India"
import { Region } from "../country/region/Region"

function createRegion_in(code: IndiaRegionCode, place: Place) {
  return new Region(code, india, [place])
}

export const indiaRegions: Region[] = [
  createRegion_in(IndiaRegionCode.mh, Place.fromLocation(47.466667, 0.833333)),
  createRegion_in(IndiaRegionCode.tg, Place.fromLocation(47.466667, 0.833333))
]
