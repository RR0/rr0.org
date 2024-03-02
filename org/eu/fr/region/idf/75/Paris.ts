import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { ileDeFrance } from "../Idf"

export const paris = new Organization(FranceDepartementCode.Paris, [Place.fromDMS("48°51′24″N,2°21′07″E")],
  OrganizationType.department, ileDeFrance)
