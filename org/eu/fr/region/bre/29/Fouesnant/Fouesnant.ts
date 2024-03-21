import { Place } from "../../../../../../../place/Place"
import { FinistereCityCode } from "../FinistereCityCode"
import { City } from "../../../../../../country/region/department/city/City"
import { finistere } from "../Finistere"

export const fouesnant = new City(FinistereCityCode.Fouesnant, finistere, [Place.fromDMS("47°53′39″N,4°00′36″W")])
