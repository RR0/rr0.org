import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"

export const saoneEtLoire = new Organization(FranceDepartementCode.SaoneEtLoire, [Place.fromDMS("46°40′N,4°42′E")],
  OrganizationType.department, bourgogneFrancheComte)
