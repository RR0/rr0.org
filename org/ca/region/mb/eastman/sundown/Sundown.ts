import { Place } from "../../../../../../place/Place.js"
import { eastman } from "../Eastman.js"
import { EastmanCityCode } from "../EastmanCityCode.js"
import { City } from "../../../../../country/region/department/city/City.js"

export const sundown = City.create(EastmanCityCode.Sundown, eastman, Place.fromDMS("49°6′13″N,96°16′0″W"))
