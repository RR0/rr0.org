import { Place } from "../../../place/Place"
import { idfCities } from "./region/idf/IdfCities"
import { franceCity } from "./FranceCity"
import { paysDeLoireCities } from "./region/pdl/PaysDeLoireCities"
import { pacaCities } from "./region/pac/PacaCities"
import { auvergneRhoneAlpesCities } from "./region/ara/AuvergneRhoneAlpesCities"
import { nouvelleAquitaineCities } from "./region/naq/NouvelleAquitaineCities"
import { City } from "../../country/region/department/city/City"

export const franceCities: { [p: string]: City } = {
  ...pacaCities,
  ...nouvelleAquitaineCities,
  ...idfCities,
  ...paysDeLoireCities,
  PontLEveque_14: franceCity(14130, Place.fromLocation(49.285556, 0.183889)),
  PontLEveque_60: franceCity(60400, Place.fromLocation(49.565278, 2.988611)),
  ...auvergneRhoneAlpesCities
}
