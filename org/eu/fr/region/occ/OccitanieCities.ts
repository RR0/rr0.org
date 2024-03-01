import { gersCities } from "./32/GersCities"
import { City } from "../../../../country/region/department/city/City"
import { heraultCities } from "./34/HeraultCities"
import { tarnEtGaronneCities } from "./82/TarnEtGaronneCities"
import { hauteGaronneCities } from "./31/HauteGaronneCities"
import { audeCities } from "./11/AudeCities"
import { tarnCities } from "./81/TarnCities"

export const occitanieCities: City[] = [
  ...audeCities,
  ...gersCities,
  ...hauteGaronneCities,
  ...heraultCities,
  ...tarnCities,
  ...tarnEtGaronneCities
]
