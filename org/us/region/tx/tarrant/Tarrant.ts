import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"
import { texas } from "../Texas"

export const tarrant = new Organization(UsaDepartementCode.tarrant, Place.fromDMS("32°46′N 97°17′W"),
  OrganizationType.department, texas)
