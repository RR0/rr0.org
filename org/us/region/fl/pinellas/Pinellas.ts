import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { Organization, OrganizationType } from "../../../../Organization.js"
import { florida } from "../Florida.js"

export const pinellas = new Organization(UsaCountyCode.pinellas, [Place.fromDMS("27°54′N 82°44′W")],
  OrganizationType.department, florida)
