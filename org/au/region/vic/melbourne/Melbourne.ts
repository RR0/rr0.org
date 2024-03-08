import { VictoriaCityCode } from "../VictoriaCityCode"
import { Place } from "../../../../../place/Place"
import { victoria } from "../Victoria"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { Organization, OrganizationType } from "../../../../Organization"

export const melbourneVic = new Organization<DepartmentMessages>(
  VictoriaCityCode.Melbourne,
  [Place.fromDMS("37° 48′ 51″S, 144° 58′06″E")],
  OrganizationType.city,
  victoria
)
