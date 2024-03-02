import { northKareliaCities } from "./region/nk/NorthKareliaCities"
import { City } from "../../country/region/department/city/City"
import { pirkanmaaCities } from "./region/p/PirkanmaaCities"

export const finlandCities: City[] = [
  ...northKareliaCities,
  ...pirkanmaaCities
]
