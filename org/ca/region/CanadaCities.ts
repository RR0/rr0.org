import { City } from "../../country/region/department/city/City.js"
import { britishColumbiaCities } from "./bc/BritishColumbiaCities.js"
import { manitobaCities } from "./mb/ManitobaCities.js"
import { quebecCities } from "./qc/QuebecCities.js"
import { albertaCities } from "./ab/AlbertaCities.js"

export const canadaCities: City[] = [
  ...albertaCities,
  ...britishColumbiaCities,
  ...manitobaCities,
  ...quebecCities
]
