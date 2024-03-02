import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const charente = new Organization(NouvelleAquitaineDepartmentCode.Charente,
  [Place.fromDMS("45° 50′N, 0° 20′E")], OrganizationType.department, nouvelleAquitaine)
