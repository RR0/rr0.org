import { Region } from "./Region"
import { finlandRegions } from "../../eu/fi/region/FinlandRegions"
import { franceRegions } from "../../eu/fr/region/FranceRegions"
import { denmarkRegions } from "./dk/region/DenmarkRegions"

export let europeRegions: Region[] = [
  ...denmarkRegions,
  ...finlandRegions,
  ...franceRegions
]
