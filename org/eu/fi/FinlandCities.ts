import { northKareliaCities } from "./region/nk/NorthKareliaCities"
import { City } from "../../country/region/department/city/City"
import { pirkanmaaCities } from "./region/p/PirkanmaaCities"
import { southSavoCities } from "./region/ss/SouthSavoCities"

export const finlandCities: City[] = [
  ...northKareliaCities,
  ...pirkanmaaCities,
  ...southSavoCities
]
