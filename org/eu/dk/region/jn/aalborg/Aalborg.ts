import { NorthJutlandCityCode } from "../NorthJutlandCityCode.js"
import { northJutland } from "../NorthJutland.js"
import { Place } from "../../../../../../place/Place.js"
import { City } from "../../../../../country/region/department/city/City.js"

export let aalborg = new City(NorthJutlandCityCode.Aalborg, northJutland, [Place.fromDMS("63°19′05″N,030°01′30″E")])
