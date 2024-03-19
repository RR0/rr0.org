import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { occitanie } from "../Occitanie"

export const hauteVienne = new Organization(FranceDepartementCode.HauteVienne,
  [Place.fromDMS(`45°52′N,1° 15′E`)], OrganizationType.department, occitanie)
