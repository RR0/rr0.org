import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"
import { washington } from "../Washington"

export const pierce = new Organization(UsaCountyCode.pierce, [Place.fromDMS("47°03′N 122°07′W")],
  OrganizationType.department, washington)
