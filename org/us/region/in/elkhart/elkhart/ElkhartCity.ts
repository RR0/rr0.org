import { Place } from "../../../../../../place/Place"
import { ElkhartCityCode } from "../ElkhartCityCode"
import { elkhartCounty } from "../Elkhart"

import { usaCity } from "../../../UsaCity"

export let elkhartCity = usaCity(ElkhartCityCode.Elkhart, elkhartCounty, Place.fromDMS("41°40′59″N,85°58′08″W"))
