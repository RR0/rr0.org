import { denmarkRegions } from "./dk/region/DenmarkRegions"
import { Region } from "../country/region/Region"
import { finlandRegions } from "./fi/region/FinlandRegions"
import { franceRegions } from "./fr/region/FranceRegions"

export let europeRegions: Region[] = [
  ...denmarkRegions,
  ...finlandRegions,
  ...franceRegions
]
