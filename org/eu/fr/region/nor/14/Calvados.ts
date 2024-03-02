import { NormandieDepartmentCode } from "../NormandieDepartmentCode"
import { normandie } from "../Normandie"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"

export const calvados = new Organization(NormandieDepartmentCode.Calvados, [Place.fromLocation(49.033333, 0.25)],
  OrganizationType.department, normandie)
