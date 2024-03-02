import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const charenteMaritime = new Organization(NouvelleAquitaineDepartmentCode.CharenteMaritime,
  [Place.fromDMS("45° 45′N, 0° 45′O")], OrganizationType.department, nouvelleAquitaine)
