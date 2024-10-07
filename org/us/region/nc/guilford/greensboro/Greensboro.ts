import { Place } from "../../../../../../place/Place.js"
import { guilford } from "../Guilford.js"
import { GuilfordCityCode } from "../GuilfordCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let greensboro = usaCity(GuilfordCityCode.Greensboro, guilford, Place.fromDMS("36°04′48″N,79°49′10″W"))
