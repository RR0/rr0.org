import { City } from "../../country/region/department/city/City.js"
import { britishColumbiaCities } from "./bc/BritishColumbiaCities.js"
import { manitobaCities } from "./mb/ManitobaCities.js"
import { quebecCities } from "./qc/QuebecCities.js"
import { algerCities } from "./al/AlgerCities.js"

export const panamaCities: City[] = [
  ...algerCities,
  ...britishColumbiaCities,
  ...manitobaCities,
  ...quebecCities
]
