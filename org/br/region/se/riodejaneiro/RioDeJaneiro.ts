import { Place } from "../../../../../place/Place"
import { BrazilDepartementCode } from "../../BrazilDepartementCode"
import { Organization, OrganizationType } from "../../../../Organization"
import { southEast } from "../SouthEast"

export const rioDeJaneiro = new Organization(
  BrazilDepartementCode.rioDeJaneiro,
  [Place.fromDMS(`47°03′N,122°07′W`)],
  OrganizationType.department,
  southEast
)
