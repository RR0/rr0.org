import { alabamaCities } from "./al/AlabamaCities"
import { californiaCities } from "./ca/CaliforniaCities"
import { texasCities } from "./tx/TexasCities"
import { floridaCities } from "./fl/FloridaCities"
import { pennsylvaniaCities } from "./pa/PennsylvaniaCities"
import { washingtonCities } from "./wa/WashingtonCities"
import { indianaCities } from "./in/IndianaCities"
import { City } from "../../country/region/department/city/City"
import { Department } from "../../country/region/department/Department"
import { Place } from "../../../place/Place"
import { northCarolinaCities } from "./nc/NorthCarolinaCities"
import { newJerseyCities } from "./nj/NewJerseyCities"
import { newYorkCities } from "./ny/NewYorkCities"
import { westVirginiaCities } from "./wv/WestVirginiaCities"
import { virginiaCities } from "./va/VirginiaCities"

export const usaCities: City[] = [
  ...alabamaCities,
  ...californiaCities,
  ...floridaCities,
  ...indianaCities,
  ...pennsylvaniaCities,
  ...newJerseyCities,
  ...newYorkCities,
  ...northCarolinaCities,
  ...texasCities,
  ...virginiaCities,
  ...washingtonCities,
  ...westVirginiaCities
]

export function usaCity(code: string, county: Department, place: Place): City {
  return new City(code, county, [place])
}
