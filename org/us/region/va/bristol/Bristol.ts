import { City } from "../../../../country/region/department/city/City"
import { virginia } from "../Virginia"
import { Place } from "../../../../../place/Place"

export const bristolCityCode = "bristolVA"
export let bristol = new City(bristolCityCode, virginia, [Place.fromDMS("36°36′N,82°11′W")])
