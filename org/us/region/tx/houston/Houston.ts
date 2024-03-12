import { texas } from "../Texas"
import { Place } from "../../../../../place/Place"

import { usaCity } from "../../UsaCity"

export const houstonCityCode = "48-35000"
export let houston = usaCity(houstonCityCode, texas, Place.fromDMS("29°45′46″N 95°22′59″W"))
