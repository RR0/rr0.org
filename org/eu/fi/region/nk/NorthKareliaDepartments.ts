import { Place } from "../../../../../place/Place"
import { FinlandDepartementCode } from "../FinlandDepartementCode"
import { Organization, OrganizationType } from "../../../../Organization"
import { northKarelia } from "./NorthKarelia"

export const northKareliaDepartments: Organization[] = [
  new Organization(FinlandDepartementCode.pk, [Place.fromLocation(48, 0.316667)], OrganizationType.department,
    northKarelia)
]
