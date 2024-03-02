import { Place } from "../../../../place/Place"
import { Organization, OrganizationType } from "../../../Organization"
import { california } from "./California"

export function caDepartment(code: string, place: Place): Organization {
  return new Organization(code, [place], OrganizationType.department, california)
}
