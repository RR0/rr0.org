import { philippines } from "../Philippines"
import { PhilippinesRegionCode } from "./PhilippinesRegionCode"
import { Region } from "../../country/region/Region"
import { Place } from "../../../place/Place"

export function philippinesRegion(code: PhilippinesRegionCode, place: Place) {
  return new Region(code, philippines, [place])
}
