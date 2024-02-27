import { creuseCities } from "./23/CreuseCities"
import { City } from "../../../../country/region/department/city/City"

export const nouvelleAquitaineCities: { [p: string]: City } = {
  ...creuseCities
}
