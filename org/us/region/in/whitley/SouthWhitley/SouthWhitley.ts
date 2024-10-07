import { Place } from "../../../../../../place/Place.js"
import { WhitleyCityCode } from "../WhitleyCityCode.js"
import { usaCity } from "../../../UsaCity.js"
import { whitleyCounty } from "../Whitley.js"

export let southWhitley = usaCity(WhitleyCityCode.SouthWhitley, whitleyCounty, Place.fromDMS("41°40′59″N,85°58′08″W"))
