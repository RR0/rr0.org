import { creuseCities } from "./23/CreuseCities"
import { City } from "../../../../country/region/department/city/City"
import { charenteCities } from "./16/CharenteCities"
import { landesCities } from "./40/LandesCities"

export const nouvelleAquitaineCities: { [p: string]: City } = {
  ...charenteCities,
  ...creuseCities,
  ...landesCities
}
