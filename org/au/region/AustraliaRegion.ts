import { AustraliaRegionCode } from "./AustraliaRegionCode"
import { Place } from "../../../place/Place"
import { australia } from "../Australia"
import { Organization } from "../../index"

export function australiaRegion(code: AustraliaRegionCode, place: Place) {
  return new Organization(code, [place], australia)
}
