import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const vienne = new Organization(NouvelleAquitaineDepartmentCode.Vienne,
  [Place.fromDMS("46°30′N,0°30′E")], OrganizationType.department, nouvelleAquitaine)
