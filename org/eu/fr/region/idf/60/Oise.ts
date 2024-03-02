import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { ileDeFrance } from "../Idf"

export const oise = new Organization(FranceDepartementCode.Oise, [Place.fromLocation(49.383333, 2.416667)],
  OrganizationType.department, ileDeFrance)
