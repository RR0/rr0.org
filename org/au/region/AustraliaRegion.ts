import { AustraliaRegionCode } from "./AustraliaRegionCode"
import { Place } from "../../../place/Place"
import { australia } from "../Australia"
import { Region } from "../../country/region/Region"

export function australiaRegion(code: AustraliaRegionCode, place: Place) {
  return new Region(code, australia, [place])
}
