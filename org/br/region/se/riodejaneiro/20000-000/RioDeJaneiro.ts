import { Place } from "../../../../../../place/Place.js"
import { RioDeJaneiroCityCode } from "../RioDeJaneiroCityCode.js"
import { City } from "../../../../../country/region/department/city/City.js"
import { rioDeJaneiro } from "../RioDeJaneiro.js"

export const rioDeJaneiroCity = new City(RioDeJaneiroCityCode.RioDeJaneiro, rioDeJaneiro,
  [Place.fromDMS("15°47′38″S,47°52′58″W")]
)
