import { Place } from "../../../../../../../place/Place"
import { MartiniqueCityCode } from "../MartiniqueCityCode"
import { City } from "../../../../../../country/region/department/city/City"
import { martinique972 } from "../Martinique"

export const casePilote = City.create(MartiniqueCityCode.CasePilote, martinique972,
  Place.fromDMS("14° 38′ 34″N, 61° 08′ 19″W"))
