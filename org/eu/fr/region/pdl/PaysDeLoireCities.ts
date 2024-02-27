import { sartheCities } from "./72/SartheCities"
import { City } from "../../../../country/region/department/city/City"

export const paysDeLoireCities: { [p: string]: City } = {
  ...sartheCities
}
