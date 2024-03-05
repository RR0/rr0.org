import { Place } from "../../../../../../place/Place"
import { eastman } from "../Eastman"
import { EastmanCityCode } from "../EastmanCityCode"
import { City } from "../../../../../country/region/department/city/City"

export const sundown = City.create(EastmanCityCode.Sundown, eastman, Place.fromDMS("49°6′13″N,96°16′0″W"))
