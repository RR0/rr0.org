import { Place } from "../../../../../../place/Place"
import { WhitleyCityCode } from "../WhitleyCityCode"
import { usaCity } from "../../../UsaCity"
import { whitleyCounty } from "../Whitley"

export let southWhitley = usaCity(WhitleyCityCode.SouthWhitley, whitleyCounty, Place.fromDMS("41°40′59″N,85°58′08″W"))
