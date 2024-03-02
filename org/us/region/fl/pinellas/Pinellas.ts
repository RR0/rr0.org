import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"
import { florida } from "../Florida"

export const pinellas = new Organization(UsaDepartementCode.pinellas, [Place.fromDMS("27°54′N 82°44′W")],
  OrganizationType.department, florida)
