import { Place } from "../../../../../../../place/Place.js"
import { FinistereCityCode } from "../FinistereCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { finistere } from "../Finistere.js"

export const fouesnant = new City(FinistereCityCode.Fouesnant, finistere, [Place.fromDMS("47°53′39″N,4°00′36″W")])
