import { gersCities } from "./32/GersCities.js"
import { heraultCities } from "./34/HeraultCities.js"
import { tarnEtGaronneCities } from "./82/TarnEtGaronneCities.js"
import { hauteGaronneCities } from "./31/HauteGaronneCities.js"
import { audeCities } from "./11/AudeCities.js"
import { tarnCities } from "./81/TarnCities.js"
import { Organization } from "../../../../Organization.js"
import { gardCities } from "./30/GardCities.js"
import { pyreneesOrientalesCities } from "./66/PyreneesOrientalesCities.js"
import { ariegeCities } from "./09/AriegeCities.js"
import { hauteVienneCities } from "./87/HauteVienneCities.js"
import { aveyronCities } from "./12/AveyronCities.js"
import { hautesPyreneesCities } from "./65/HautesPyreneesCities.js"

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
