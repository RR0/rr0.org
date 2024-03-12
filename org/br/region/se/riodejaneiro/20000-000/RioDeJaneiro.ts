import { Place } from "../../../../../../place/Place"
import { RioDeJaneiroCityCode } from "../RioDeJaneiroCityCode"
import { City } from "../../../../../country/region/department/city/City"
import { rioDeJaneiro } from "../RioDeJaneiro"

export const rioDeJaneiroCity = new City(RioDeJaneiroCityCode.RioDeJaneiro, rioDeJaneiro,
  [Place.fromDMS("15°47′38″S,47°52′58″W")]
)
