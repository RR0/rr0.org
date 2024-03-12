import { alabamaCities } from "./al/AlabamaCities"
import { californiaCities } from "./ca/CaliforniaCities"
import { texasCities } from "./tx/TexasCities"
import { floridaCities } from "./fl/FloridaCities"
import { pennsylvaniaCities } from "./pa/PennsylvaniaCities"
import { washingtonCities } from "./wa/WashingtonCities"
import { indianaCities } from "./in/IndianaCities"
import { City } from "../../country/region/department/city/City"
import { northCarolinaCities } from "./nc/NorthCarolinaCities"
import { newJerseyCities } from "./nj/NewJerseyCities"
import { newYorkCities } from "./ny/NewYorkCities"
import { westVirginiaCities } from "./wv/WestVirginiaCities"
import { virginiaCities } from "./va/VirginiaCities"
import { hawaiiCities } from "./hi/HawaiiCities"

export const usaCities: City[] = [
  ...alabamaCities,
  ...californiaCities,
  ...floridaCities,
  ...hawaiiCities,
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
