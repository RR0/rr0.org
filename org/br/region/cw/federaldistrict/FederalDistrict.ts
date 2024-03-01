import { Place } from "../../../../../place/Place"
import { BrazilDepartementCode } from "../../BrazilDepartementCode"
import { Organization, OrganizationType } from "../../../../Organization"
import { centralWest } from "../CentralWest"

export const federalDistrict = new Organization(BrazilDepartementCode.federalDistrict,
  [Place.fromDMS(`47°03′N,122°07′W`)], OrganizationType.department, centralWest)
