import { gersCities } from "./32/GersCities"
import { heraultCities } from "./34/HeraultCities"
import { tarnEtGaronneCities } from "./82/TarnEtGaronneCities"
import { hauteGaronneCities } from "./31/HauteGaronneCities"
import { audeCities } from "./11/AudeCities"
import { tarnCities } from "./81/TarnCities"
import { Organization } from "../../../../Organization"
import { gardCities } from "./30/GardCities"
import { pyreneesOrientalesCities } from "./66/PyreneesOrientalesCities"
import { ariegeCities } from "./09/AriegeCities"
import { hauteVienneCities } from "./87/HauteVienneCities"
import { aveyronCities } from "./12/AveyronCities"
import { hautesPyreneesCities } from "./65/HautesPyreneesCities"

export const occitanieCities: Organization[] = [
  ...ariegeCities,
  ...audeCities,
  ...aveyronCities,
  ...gardCities,
  ...gersCities,
  ...hauteGaronneCities,
  ...hautesPyreneesCities,
  ...hauteVienneCities,
  ...heraultCities,
  ...tarnCities,
  ...tarnEtGaronneCities,
  ...pyreneesOrientalesCities
]
