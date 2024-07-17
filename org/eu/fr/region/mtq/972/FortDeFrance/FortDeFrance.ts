import { Place } from "../../../../../../../place/Place"
import { MartiniqueCityCode } from "../MartiniqueCityCode"
import { City } from "../../../../../../country/region/department/city/City"
import { martinique972 } from "../Martinique"

export const fortDeFrance = City.create(MartiniqueCityCode.FortDeFrance, martinique972,
  Place.fromDMS("14°36′48″N,61°03′52″W"))
