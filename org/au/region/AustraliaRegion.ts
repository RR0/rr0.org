import { AustraliaRegionCode } from "./AustraliaRegionCode"
import { Place } from "../../../place/Place"
import { Region } from "../../country/region/Region"
import { australia } from "../Australia"

export function australiaRegion(code: AustraliaRegionCode, place: Place) {
  return new Region(code, australia, [place], `${australia.code}/${code}`)
}
