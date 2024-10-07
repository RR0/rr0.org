import { FranceRegionCode } from "./fr/region/FranceRegionCode.js"
import { FinlandRegionCode } from "./fi/region/FinlandRegionCode.js"
import { SpainRegionCode } from "./es/region/SpainRegionCode.js"
import { PolandRegionCode } from "./pl/region/PolandRegionCode.js"
import { DenmarkRegionCode } from "./dk/region/DenmarkRegionCode.js"
import { GermanyRegionCode } from "./de/region/GermanyRegionCode.js"

export type EuropeRegionCode =
  FranceRegionCode
  | DenmarkRegionCode
  | FinlandRegionCode
  | GermanyRegionCode
  | PolandRegionCode
  | SpainRegionCode
