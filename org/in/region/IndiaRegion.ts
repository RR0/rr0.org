import { IndiaRegionCode } from "./IndiaRegionCode"
import { Place } from "../../../place/Place"
import { Region } from "../../country/region/Region"
import { india } from "../India"

export function indiaRegion(code: IndiaRegionCode, place: Place) {
  return new Region(code, india, [place])
}
