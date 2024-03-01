import { pierce } from "../Pierce"
import { City } from "../../../../../country/region/department/city/City"
import { Place } from "../../../../../../place/Place"
import { PierceCityCode } from "../PierceCityCode"

export let bonneyLake = new City(PierceCityCode.BonneyLake, Place.fromDMS("47°11′13″N 122°10′12″W"), pierce)
