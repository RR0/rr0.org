import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { occitanie } from "../Occitanie"

export const hauteGaronne = new Organization(FranceDepartementCode.HauteGaronne,
  [Place.fromDMS(`43°26′N,1°08′E`)], OrganizationType.department, occitanie)
