import { idfCities } from "./idf/IdfCities.js"
import { paysDeLoireCities } from "./pdl/PaysDeLoireCities.js"
import { pacaCities } from "./pac/PacaCities.js"
import { auvergneRhoneAlpesCities } from "./ara/AuvergneRhoneAlpesCities.js"
import { nouvelleAquitaineCities } from "./naq/NouvelleAquitaineCities.js"
import { bourgogneFrancheComteCities } from "./bfc/BourgogneFrancheComteCities.js"
import { occitanieCities } from "./occ/OccitanieCities.js"
import { hautsDeFranceCities } from "./hdf/HautsDeFranceCities.js"
import { grandEstCities } from "./ges/GrandEstCities.js"
import { laReunionCities } from "./lre/LaReunionCities.js"
import { normandieCities } from "./nor/NormandieCities.js"
import { centreValDeLoireCities } from "./cvl/CentreValDeLoireCities.js"
import { bretagneCities } from "./bre/BretagneCities.js"
import { martiniqueRegionCities } from "./mtq/MartiniqueRegionCities.js"
import { collectiviteOutreMerCities } from "./com/CollectiviteOutreMerCities.js"
import { City } from "../../../country/region/department/city/City.js"
import { guadeloupeRegionCities } from "./gua/GuadeloupeRegionCities.js"

export const franceCities: City[] = [
  ...auvergneRhoneAlpesCities,
  ...bourgogneFrancheComteCities,
  ...bretagneCities,
  ...centreValDeLoireCities,
  ...collectiviteOutreMerCities,
  ...grandEstCities,
  ...guadeloupeRegionCities,
  ...idfCities,
  ...hautsDeFranceCities,
  ...laReunionCities,
  ...martiniqueRegionCities,
  ...normandieCities,
  ...nouvelleAquitaineCities,
  ...occitanieCities,
  ...pacaCities,
  ...paysDeLoireCities
]
