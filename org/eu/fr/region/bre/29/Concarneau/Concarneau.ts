import { Place } from "../../../../../../../place/Place.js"
import { FinistereCityCode } from "../FinistereCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { finistere } from "../Finistere.js"

export const concarneau = new City(FinistereCityCode.Concarneau, finistere, [Place.fromDMS("47°52′34″N,3°55′04″W")])
