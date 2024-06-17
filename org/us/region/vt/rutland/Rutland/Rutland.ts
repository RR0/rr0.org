import { Place } from "../../../../../../place/Place"
import { rutlandCounty } from "../Rutland"
import { RutlandCityCode } from "../RutlandCityCode"
import { usaCity } from "../../../UsaCity"

export let rutland = usaCity(RutlandCityCode.Rutland, rutlandCounty, Place.fromDMS("43°36′32″N 72°58′47″W"))
