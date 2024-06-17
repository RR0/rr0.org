import { Place } from "../../../../../../place/Place"
import { carbon } from "../Carbon"
import { CarbonCityCode } from "../CarbonCityCode"
import { usaCity } from "../../../UsaCity"

export let rawlins = usaCity(CarbonCityCode.rawlins, carbon, Place.fromDMS("41°47′25″N 107°14′3″W"))
