import { Place } from "../../../../../../place/Place.js"
import { carbon } from "../Carbon.js"
import { CarbonCityCode } from "../CarbonCityCode.js"
import { usaCity } from "../../../UsaCity.js"

export let rawlins = usaCity(CarbonCityCode.rawlins, carbon, Place.fromDMS("41°47′25″N 107°14′3″W"))
