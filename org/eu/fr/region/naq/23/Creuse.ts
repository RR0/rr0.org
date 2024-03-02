import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const creuse = new Organization(NouvelleAquitaineDepartmentCode.Creuse,
  [Place.fromLocation(46.189722, 2.085556)], OrganizationType.department, nouvelleAquitaine)
