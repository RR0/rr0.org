import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { Organization, OrganizationType } from "../../../../../Organization"
import { paca } from "../Paca"

export let alpesMaritimes = new Organization(PacaDepartementCode.AlpesMaritimes,
  [Place.fromDMS("43° 50′N, 7° 10′E")], OrganizationType.department, paca)
