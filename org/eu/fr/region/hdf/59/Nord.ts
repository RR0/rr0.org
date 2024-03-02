import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { hautsDeFrance } from "../HautsDeFrance"

export const nord = new Organization(HautsDeFranceDepartmentCode.Nord, [Place.fromDMS("50°23′N,3°19′E")],
  OrganizationType.department, hautsDeFrance)
