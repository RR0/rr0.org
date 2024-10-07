import { Place } from "../../../../../../../place/Place.js"
import { MartiniqueCityCode } from "../MartiniqueCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { martinique972 } from "../Martinique.js"

export const casePilote = City.create(MartiniqueCityCode.CasePilote, martinique972,
  Place.fromDMS("14° 38′ 34″N, 61° 08′ 19″W"))
