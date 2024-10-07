import { Place } from "../../../../../../../place/Place.js"
import { MartiniqueCityCode } from "../MartiniqueCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { martinique972 } from "../Martinique.js"

export const fortDeFrance = City.create(MartiniqueCityCode.FortDeFrance, martinique972,
  Place.fromDMS("14°36′48″N,61°03′52″W"))
