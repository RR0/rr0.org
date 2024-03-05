import { City } from "../../country/region/department/city/City"
import { britishColumbiaCities } from "./bc/BritishColumbiaCities"
import { manitobaCities } from "./mb/ManitobaCities"
import { quebecCities } from "./qc/QuebecCities"
import { albertaCities } from "./ab/AlbertaCities"

export const canadaCities: City[] = [
  ...albertaCities,
  ...britishColumbiaCities,
  ...manitobaCities,
  ...quebecCities
]
