import { sofala } from "../Sofala"
import { City } from "../../../../country/region/department/city/City"
import { Place } from "../../../../../place/Place"

export const beiraCityCode = "beira"
export const beira = new City(beiraCityCode, sofala, [Place.fromDMS("19°50′00″S,34°51′00″E")])
