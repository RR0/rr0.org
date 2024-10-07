import { Place } from "../../../../../../place/Place.js"
import { rutlandCounty } from "../Rutland.js"
import { RutlandCityCode } from "../RutlandCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let rutland = usaCity(RutlandCityCode.Rutland, rutlandCounty, Place.fromDMS("43°36′32″N 72°58′47″W"))
