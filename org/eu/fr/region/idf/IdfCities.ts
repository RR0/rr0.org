import { hautsDeSeineCities } from "./92/HautsDeSeineCities.js"
import { City } from "../../../../country/region/department/city/City.js"
import { oiseCities } from "./60/OiseCities.js"
import { parisCities } from "./75/ParisCities.js"
import { yvelinesCities } from "./78/YvelinesCities.js"
import { seineEtMarneCities } from "./77/SeineEtMarneCities.js"
import { valDOiseCities } from "./95/ValDOiseCities.js"
import { essonneCities } from "./91/EssonneCities.js"

export const idfCities: City[] = [
  ...essonneCities,
  ...hautsDeSeineCities,
  ...oiseCities,
  ...parisCities,
  ...seineEtMarneCities,
  ...valDOiseCities,
  ...yvelinesCities
]
