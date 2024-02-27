import { RegionMessages } from "../../../country/region/RegionMessages"
import { sanDiegoMessages_fr } from "./sandiego/SanDiegoMessages_fr"

export const californiaMessages_fr = new RegionMessages(
  "Californie",
  {
    sandiego: sanDiegoMessages_fr
  }
)
