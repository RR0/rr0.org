import { gersCities } from "./32/GersCities"
import { heraultCities } from "./34/HeraultCities"
import { tarnEtGaronneCities } from "./82/TarnEtGaronneCities"
import { hauteGaronneCities } from "./31/HauteGaronneCities"
import { audeCities } from "./11/AudeCities"
import { tarnCities } from "./81/TarnCities"
import { Organization } from "../../../../Organization"
import { gardCities } from "./30/GardCities"

export const occitanieCities: Organization[] = [
  ...audeCities,
  ...gardCities,
  ...gersCities,
  ...hauteGaronneCities,
  ...heraultCities,
  ...tarnCities,
  ...tarnEtGaronneCities
]
