import { texas } from "../Texas.js"
import { Place } from "../../../../../place/Place.js"

import { usaCity } from "../../UsaCity.js"

export const houstonCityCode = "48-35000"
export let houston = usaCity(houstonCityCode, texas, Place.fromDMS("29°45′46″N 95°22′59″W"))
