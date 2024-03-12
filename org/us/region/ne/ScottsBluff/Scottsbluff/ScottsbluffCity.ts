import { Place } from "../../../../../../place/Place"
import { ScottsBluffCityCode } from "../ScottsBluffCityCode"
import { usaCity } from "../../../UsaCity"
import { scottsbluffCounty } from "../ScottsbluffCounty"

export let scottsbluffCity = usaCity(ScottsBluffCityCode.Scottsbluff, scottsbluffCounty,
  Place.fromDMS("41°52′02″N,103°39′39″O"))
