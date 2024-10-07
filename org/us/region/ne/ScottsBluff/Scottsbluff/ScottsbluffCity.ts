import { Place } from "../../../../../../place/Place.js"
import { ScottsBluffCityCode } from "../ScottsBluffCityCode.js"
import { usaCity } from "../../../UsaCity.js"
import { scottsbluffCounty } from "../ScottsbluffCounty.js"

export let scottsbluffCity = usaCity(ScottsBluffCityCode.Scottsbluff, scottsbluffCounty,
  Place.fromDMS("41°52′02″N,103°39′39″O"))
