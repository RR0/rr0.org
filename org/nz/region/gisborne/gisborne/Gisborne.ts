import { GisborneCityCode } from "../GisborneCityCode"
import { Place } from "../../../../../place/Place"
import { gisborneRegion } from "../Gisborne"
import { City } from "../../../../country/region/department/city/City"

export let gisborneCity = new City(GisborneCityCode.Gisborne, gisborneRegion, [Place.fromLocation(44.896389, 6.635556)])
