import { Place } from "../../../../../../../place/Place.js"
import { PkCityCode } from "../PkCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { pk } from "../Pk.js"

export let lieksa = new City(PkCityCode.Lieska, pk, [Place.fromDMS("63°19′05″N,030°01′30″E")])
