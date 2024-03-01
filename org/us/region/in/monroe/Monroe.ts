import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"
import { indiana } from "../Indiana"

export const monroe = new Organization(UsaDepartementCode.monroe, [Place.fromDMS("39°10′N,86°31′O")],
  OrganizationType.department, indiana)
