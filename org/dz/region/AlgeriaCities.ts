import { City } from "../../country/region/department/city/City.js"
import { algerCities } from "./al/AlgerCities.js"
import { britishColumbiaCities } from "../../ca/region/bc/BritishColumbiaCities.js"
import { manitobaCities } from "../../ca/region/mb/ManitobaCities.js"
import { quebecCities } from "../../ca/region/qc/QuebecCities.js"

export const algeriaCities: City[] = [
  ...algerCities,
  ...britishColumbiaCities,
  ...manitobaCities,
  ...quebecCities
]
