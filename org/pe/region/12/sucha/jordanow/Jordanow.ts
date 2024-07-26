import { sucha } from "../Sucha"
import { SuchaCityCode } from "../SuchaCityCode"
import { Place } from "../../../../../../place/Place"
import { City } from "../../../../../country/region/department/city/City"

export const jordanow = new City(SuchaCityCode.Jordanow, sucha, [Place.fromDMS("49°40′N,19°50′E")])
