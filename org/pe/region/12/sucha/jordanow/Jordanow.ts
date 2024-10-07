import { sucha } from "../Sucha.js"
import { SuchaCityCode } from "../SuchaCityCode.js"
import { Place } from "../../../../../../place/Place.js"
import { City } from "../../../../../country/region/department/city/City.js"

export const jordanow = new City(SuchaCityCode.Jordanow, sucha, [Place.fromDMS("49°40′N,19°50′E")])
