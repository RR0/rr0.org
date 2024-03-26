import { City } from "../../country/region/department/city/City"
import { algerCities } from "./al/AlgerCities"
import { britishColumbiaCities } from "../../ca/region/bc/BritishColumbiaCities"
import { manitobaCities } from "../../ca/region/mb/ManitobaCities"
import { quebecCities } from "../../ca/region/qc/QuebecCities"

export const algeriaCities: City[] = [
  ...algerCities,
  ...britishColumbiaCities,
  ...manitobaCities,
  ...quebecCities
]
