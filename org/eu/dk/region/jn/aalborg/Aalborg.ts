import { NorthJutlandCityCode } from "../NorthJutlandCityCode"
import { northJutland } from "../NorthJutland"
import { Place } from "../../../../../../place/Place"
import { City } from "../../../../../country/region/department/city/City"

export let aalborg = new City(NorthJutlandCityCode.Aalborg, northJutland, [Place.fromDMS("63°19′05″N,030°01′30″E")])
