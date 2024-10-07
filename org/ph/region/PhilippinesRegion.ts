import { philippines } from "../Philippines.js"
import { PhilippinesRegionCode } from "./PhilippinesRegionCode.js"
import { Region } from "../../country/region/Region.js"
import { Place } from "../../../place/Place.js"

export function philippinesRegion(code: PhilippinesRegionCode, place: Place) {
  return new Region(code, philippines, [place])
}
