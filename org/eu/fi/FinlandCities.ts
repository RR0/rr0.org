import { northKareliaCities } from "./region/nk/NorthKareliaCities.js"
import { City } from "../../country/region/department/city/City.js"
import { pirkanmaaCities } from "./region/p/PirkanmaaCities.js"
import { southSavoCities } from "./region/ss/SouthSavoCities.js"

export const finlandCities: City[] = [
  ...northKareliaCities,
  ...pirkanmaaCities,
  ...southSavoCities
]
