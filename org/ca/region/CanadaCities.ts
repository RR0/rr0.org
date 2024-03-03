import { City } from "../../country/region/department/city/City"
import { britishColumbiaCities } from "./bc/BritishColumbiaCities"
import { manitobaCities } from "./mb/ManitobaCities"

export const canadaCities: City[] = [
  ...britishColumbiaCities,
  ...manitobaCities
]
