import { VictoriaCityCode } from "../VictoriaCityCode"
import { Place } from "../../../../../place/Place"
import { victoria } from "../Victoria"
import { City } from "../../../../country/region/department/city/City"

export const melbourneVic = new City(VictoriaCityCode.Melbourne, victoria, [Place.fromDMS("37°48′51″S,144°58′06″E")])
