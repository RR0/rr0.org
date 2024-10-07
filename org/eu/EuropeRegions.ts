import { denmarkRegions } from "./dk/region/DenmarkRegions.js"
import { Region } from "../country/region/Region.js"
import { finlandRegions } from "./fi/region/FinlandRegions.js"
import { franceRegions } from "./fr/region/FranceRegions.js"

export let europeRegions: Region[] = [
  ...denmarkRegions,
  ...finlandRegions,
  ...franceRegions
]
