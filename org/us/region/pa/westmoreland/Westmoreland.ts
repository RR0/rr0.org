import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"
import { pennsylvania } from "../Pennsylvania"

export const westmoreland = new Organization(UsaDepartementCode.westmoreland,
  [Place.fromDMS("40°19′N 79°28′W")], OrganizationType.department, pennsylvania)
