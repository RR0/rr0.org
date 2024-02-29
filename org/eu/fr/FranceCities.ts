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

export const franceCities: City[] = [
  ...auvergneRhoneAlpesCities,
  ...bourgogneFrancheComteCities,
  ...grandEstCities,
  ...idfCities,
  ...hautsDeFranceCities,
  ...pacaCities,
  ...nouvelleAquitaineCities,
  ...occitanieCities,
  ...paysDeLoireCities
]
