import { createCity } from "../NwpCity"
import { Place } from "../../../../../../../place/Place"
import { NwpCityCode } from "../NwpCityCode"

export let parkano = createCity(NwpCityCode.Parkano, Place.fromDMS("62°00′30″N,23°01′30″E"))
