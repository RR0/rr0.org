import { RegionMessages } from "../../../country/region/RegionMessages"
import { sanDiegoMessages_fr } from "./sandiego/SanDiegoMessages_fr"

export const californiaMessages_fr = RegionMessages.create(
  "Californie",
  {
    sandiego: sanDiegoMessages_fr
  }
)
