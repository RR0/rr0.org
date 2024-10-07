import { Place } from "../../../../../../place/Place.js"
import { ElkhartCityCode } from "../ElkhartCityCode.js"
import { elkhartCounty } from "../Elkhart.js"

import { usaCity } from "../../../UsaCity.js"

export let elkhartCity = usaCity(ElkhartCityCode.Elkhart, elkhartCounty, Place.fromDMS("41°40′59″N,85°58′08″W"))
