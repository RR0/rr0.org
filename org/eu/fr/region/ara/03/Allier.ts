import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const allier = new Organization(FranceDepartementCode.Allier, [Place.fromDMS("46°25′N,3°10′E")],
  OrganizationType.department, auvergneRhoneAlpes)
