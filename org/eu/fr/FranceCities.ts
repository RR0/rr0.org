import { idfCities } from "./region/idf/IdfCities"
import { paysDeLoireCities } from "./region/pdl/PaysDeLoireCities"
import { pacaCities } from "./region/pac/PacaCities"
import { auvergneRhoneAlpesCities } from "./region/ara/AuvergneRhoneAlpesCities"
import { nouvelleAquitaineCities } from "./region/naq/NouvelleAquitaineCities"
import { City } from "../../country/region/department/city/City"
import { bourgogneFrancheComteCities } from "./region/bfc/BourgogneFrancheComteCities"
import { occitanieCities } from "./region/occ/OccitanieCities"
import { hautsDeFranceCities } from "./region/hdf/HautsDeFranceCities"
import { grandEstCities } from "./region/ges/GrandEstCities"
import { laReunionCities } from "./region/lre/LaReunionCities"
import { normandieCities } from "./region/nor/NormandieCities"
import { centreValDeLoireCities } from "./region/cvl/CentreValDeLoireCities"
import { bretagneCities } from "./region/bre/BretagneCities"
import { martiniqueRegionCities } from "./region/mtq/MartiniqueRegionCities"

export const franceCities: City[] = [
  ...auvergneRhoneAlpesCities,
  ...bourgogneFrancheComteCities,
  ...bretagneCities,
  ...centreValDeLoireCities,
  ...grandEstCities,
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
