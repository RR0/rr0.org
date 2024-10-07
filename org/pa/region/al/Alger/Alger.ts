import { algerRegion } from "../AlgerRegion.js"
import { AlgerCityCode } from "../AlgerCityCode.js"
import { City } from "../../../../country/region/department/city/City.js"
import { Place } from "../../../../../place/Place.js"

export const alger = City.create(AlgerCityCode.Alger, algerRegion, Place.fromDMS("36°46′34″N,3°03′36″E"))
