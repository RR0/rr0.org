import { hautsDeSeineCities } from "./92/HautsDeSeineCities"
import { City } from "../../../../country/region/department/city/City"

export const idfCities: { [p: string]: City } = {
  ...hautsDeSeineCities
}
