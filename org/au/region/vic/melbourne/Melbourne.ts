import { VictoriaCityCode } from "../VictoriaCityCode.js"
import { Place } from "../../../../../place/Place.js"
import { victoria } from "../Victoria.js"
import { City } from "../../../../country/region/department/city/City.js"

export const melbourneVic = new City(VictoriaCityCode.Melbourne, victoria, [Place.fromDMS("37°48′51″S,144°58′06″E")])
