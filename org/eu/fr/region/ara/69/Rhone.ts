import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const rhone = new Organization(FranceDepartementCode.Rhone, [Place.fromLocation(48, 0.316667)],
  OrganizationType.department, auvergneRhoneAlpes)
