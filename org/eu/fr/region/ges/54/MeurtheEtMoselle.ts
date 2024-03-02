import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { grandEst } from "../GrandEst"

export const meurtheEtMoselle = new Organization(FranceDepartementCode.MeurtheEtMoselle,
  [Place.fromDMS(`48°40′N,6°10′E`)], OrganizationType.department, grandEst)
