import { creuseCities } from "./23/CreuseCities"
import { City } from "../../../../country/region/department/city/City"
import { charenteCities } from "./16/CharenteCities"

export const nouvelleAquitaineCities: { [p: string]: City } = {
  ...creuseCities,
  ...charenteCities
}
