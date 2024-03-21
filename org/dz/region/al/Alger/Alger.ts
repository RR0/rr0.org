import { Place } from "../../../../../../place/Place"
import { City } from "../../../../../country/region/department/city/City"
import { algerRegion } from "../AlgerRegion"
import { AlgerCityCode } from "../AlgerCityCode"

export const alger = City.create(AlgerCityCode.Alger, algerRegion, Place.fromDMS("36°46′34″N,3°03′36″E"))
