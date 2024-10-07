import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { HawaiiMessages } from "./HawaiiMessages.js"
import { HawaiiCountyCode } from "./HawaiiCountyCode.js"
import { honolulu_fr } from "./honolulu/Honolulu_fr.js"

export const hawai_fr = RegionMessages.create<HawaiiMessages>("Hawaï", {
  [HawaiiCountyCode.Honolulu]: honolulu_fr
})
