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
import { nebraskaCities } from "./ne/NebraskaCities"
import { arkansasCities } from "./ak/ArkansasCities"
import { connecticutCities } from "./ct/ConnecticutCities"
import { coloradoCities } from "./co/ColoradoCities"
import { delawareCities } from "./de/DelawareCities"
import { illinoisCities } from "./il/IllinoisCities"
import { kentuckyCities } from "./ky/KentuckyCities"
import { maineCities } from "./me/MaineCities"

export const usaCities: City[] = [
  ...alabamaCities,
  ...arkansasCities,
  ...californiaCities,
  ...coloradoCities,
  ...connecticutCities,
  ...delawareCities,
  ...floridaCities,
  ...hawaiiCities,
  ...illinoisCities,
  ...indianaCities,
  ...kentuckyCities,
  ...maineCities,
  ...pennsylvaniaCities,
  ...nebraskaCities,
  ...newJerseyCities,
  ...newYorkCities,
  ...northCarolinaCities,
  ...texasCities,
  ...virginiaCities,
  ...washingtonCities,
  ...westVirginiaCities
]
