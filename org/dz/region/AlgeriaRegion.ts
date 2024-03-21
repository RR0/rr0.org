import { AlgeriaRegionCode } from "./AlgeriaRegionCode"
import { Place } from "../../../place/Place"
import { algeria } from "../Algeria"
import { Region } from "../../country/region/Region"

export function algeriaRegion(code: AlgeriaRegionCode, place: Place) {
  return new Region(code, algeria, [place])
}
