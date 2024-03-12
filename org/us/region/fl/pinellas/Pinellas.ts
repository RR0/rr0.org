import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"
import { florida } from "../Florida"

export const pinellas = new Organization(UsaCountyCode.pinellas, [Place.fromDMS("27°54′N 82°44′W")],
  OrganizationType.department, florida)
