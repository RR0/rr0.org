import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { ileDeFrance } from "../Idf"

export const hautsDeSeine = new Organization(FranceDepartementCode.HautsDeSeine, [Place.fromLocation(48.83333, 2.2)],
  OrganizationType.department, ileDeFrance)
