import { VictoriaCityCode } from "../VictoriaCityCode"
import { Place } from "../../../../../place/Place"
import { victoria } from "../Victoria"
import { CityMessages } from "../../../../country/region/department/city/CityMessages"
import { Organization, OrganizationType } from "../../../../Organization"

export const melbourneVic = new Organization<CityMessages>(
  VictoriaCityCode.Melbourne,
  [Place.fromDMS("37° 48′ 51″S, 144° 58′06″E")],
  OrganizationType.city,
  victoria
)
