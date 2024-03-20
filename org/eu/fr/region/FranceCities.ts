import { idfCities } from "./idf/IdfCities"
import { paysDeLoireCities } from "./pdl/PaysDeLoireCities"
import { pacaCities } from "./pac/PacaCities"
import { auvergneRhoneAlpesCities } from "./ara/AuvergneRhoneAlpesCities"
import { nouvelleAquitaineCities } from "./naq/NouvelleAquitaineCities"
import { bourgogneFrancheComteCities } from "./bfc/BourgogneFrancheComteCities"
import { occitanieCities } from "./occ/OccitanieCities"
import { hautsDeFranceCities } from "./hdf/HautsDeFranceCities"
import { grandEstCities } from "./ges/GrandEstCities"
import { laReunionCities } from "./lre/LaReunionCities"
import { normandieCities } from "./nor/NormandieCities"
import { centreValDeLoireCities } from "./cvl/CentreValDeLoireCities"
import { bretagneCities } from "./bre/BretagneCities"
import { martiniqueRegionCities } from "./mtq/MartiniqueRegionCities"
import { collectiviteOutreMerCities } from "./com/CollectiviteOutreMerCities"
import { City } from "../../../country/region/department/city/City"
import { guadeloupeRegionCities } from "./gua/GuadeloupeRegionCities"

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
