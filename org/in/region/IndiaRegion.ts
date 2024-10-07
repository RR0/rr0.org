import { IndiaRegionCode } from "./IndiaRegionCode.js"
import { Place } from "../../../place/Place.js"
import { Region } from "../../country/region/Region.js"
import { india } from "../India.js"

export function indiaRegion(code: IndiaRegionCode, place: Place) {
  return new Region(code, india, [place])
}
