import { Place } from "../../../../../place/Place.js"
import { BrazilDepartementCode } from "../../BrazilDepartementCode.js"
import { Organization, OrganizationType } from "../../../../Organization.js"
import { centralWest } from "../CentralWest.js"

export const federalDistrict = new Organization(BrazilDepartementCode.federalDistrict,
  [Place.fromDMS(`47°03′N,122°07′W`)], OrganizationType.department, centralWest)
