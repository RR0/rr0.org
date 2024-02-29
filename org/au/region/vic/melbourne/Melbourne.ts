import { VictoriaCityCode } from "../VictoriaCityCode"
import { Place } from "../../../../../place/Place"
import { victoria } from "../Victoria"
import { Organization } from "../../../../index"

export const melbourneVic = new Organization(VictoriaCityCode.Melbourne, Place.fromDMS("37° 48′ 51″S, 144° 58′06″E"),
  victoria)
