import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { Organization, OrganizationType } from "../../../../../Organization"
import { paca } from "../Paca"

export let vaucluse = new Organization(PacaDepartementCode.Vaucluse, [Place.fromDMS("44°00′N,5°10′E")],
  OrganizationType.department, paca)
