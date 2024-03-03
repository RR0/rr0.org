import { RegionMessages } from "../../../country/region/RegionMessages"
import { sanDiegoMessages_en } from "./sandiego/SanDiegoMessages_en"

export const californiaMessages_en = RegionMessages.create(
  "California",
  {
    sandiego: sanDiegoMessages_en
  }
)
