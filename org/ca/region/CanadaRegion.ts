import { CanadaRegionCode } from "./CanadaRegionCode"
import { Place } from "../../../place/Place"
import { Organization, OrganizationType } from "../../Organization"
import { canada } from "../Canada"

export function canadaRegion(code: CanadaRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationType.region, canada)
}
