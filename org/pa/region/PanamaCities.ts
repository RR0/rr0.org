import { City } from "../../country/region/department/city/City"
import { britishColumbiaCities } from "./bc/BritishColumbiaCities"
import { manitobaCities } from "./mb/ManitobaCities"
import { quebecCities } from "./qc/QuebecCities"
import { algerCities } from "./al/AlgerCities"

export const panamaCities: City[] = [
  ...algerCities,
  ...britishColumbiaCities,
  ...manitobaCities,
  ...quebecCities
]
