import { AustraliaRegionCode } from "./AustraliaRegionCode"
import { Place } from "../../../place/Place"
import { australia } from "../Australia"
import { Organization, OrganizationType } from "../../Organization"

export function australiaRegion(code: AustraliaRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, australia)
}
