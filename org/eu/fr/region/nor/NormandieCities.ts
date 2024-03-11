import { City } from "../../../../country/region/department/city/City"
import { calvadosCities } from "./14/CalvadosCities"
import { seineMaritimeCities } from "./76/SeineMaritimeCities"

export const normandieCities: City[] = [
  ...calvadosCities,
  ...seineMaritimeCities
]
