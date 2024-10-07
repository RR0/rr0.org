import { Place } from "../../../../place/Place.js"
import { Organization, OrganizationType } from "../../../Organization.js"
import { california } from "./California.js"

export function caDepartment(code: string, place: Place): Organization {
  return new Organization(code, [place], OrganizationType.department, california)
}
