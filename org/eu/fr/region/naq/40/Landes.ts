import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const landes = new Organization(NouvelleAquitaineDepartmentCode.Landes,
  [Place.fromDMS("44°00′N,0°50′O")], OrganizationType.department, nouvelleAquitaine)
