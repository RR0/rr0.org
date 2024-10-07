import { PanamaRegionCode } from "./PanamaRegionCode.js"
import { Place } from "../../../place/Place.js"
import { panama } from "../Panama.js"
import { Region } from "../../country/region/Region.js"

export function panamaRegion(code: PanamaRegionCode, place: Place) {
  return new Region(code, panama, [place])
}
