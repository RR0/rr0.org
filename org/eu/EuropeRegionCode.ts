import { FranceRegionCode } from "./fr/region/FranceRegionCode"
import { FinlandRegionCode } from "./fi/region/FinlandRegionCode"
import { SpainRegionCode } from "./es/region/SpainRegionCode"
import { PolandRegionCode } from "./pl/region/PolandRegionCode"
import { DenmarkRegionCode } from "./dk/region/DenmarkRegionCode"
import { GermanyRegionCode } from "./de/region/GermanyRegionCode"

export type EuropeRegionCode =
  FranceRegionCode
  | DenmarkRegionCode
  | FinlandRegionCode
  | GermanyRegionCode
  | PolandRegionCode
  | SpainRegionCode
