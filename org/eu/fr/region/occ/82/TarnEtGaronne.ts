import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { occitanie } from "../Occitanie"

export const tarnEtGaronne = new Organization(FranceDepartementCode.TarnEtGaronne,
  [Place.fromDMS(`43°38′N,3°15′E`)], OrganizationType.department, occitanie)
