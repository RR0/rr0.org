import { PanamaRegionCode } from "./PanamaRegionCode"
import { Place } from "../../../place/Place"
import { panama } from "../Panama"
import { Region } from "../../country/region/Region"

export function panamaRegion(code: PanamaRegionCode, place: Place) {
  return new Region(code, panama, [place])
}
