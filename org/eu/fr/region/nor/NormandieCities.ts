import { City } from "../../../../country/region/department/city/City.js"
import { calvadosCities } from "./14/CalvadosCities.js"
import { seineMaritimeCities } from "./76/SeineMaritimeCities.js"

export const normandieCities: City[] = [
  ...calvadosCities,
  ...seineMaritimeCities
]
