import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { honolulu_en } from "./honolulu/Honolulu_en.js"
import { HawaiiMessages } from "./HawaiiMessages.js"
import { HawaiiCountyCode } from "./HawaiiCountyCode.js"

export const hawai_en = RegionMessages.create<HawaiiMessages>("Hawaii", {
  [HawaiiCountyCode.Honolulu]: honolulu_en
})
