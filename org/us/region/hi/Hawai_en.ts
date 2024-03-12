import { RegionMessages } from "../../../country/region/RegionMessages"
import { honolulu_en } from "./honolulu/Honolulu_en"
import { HawaiiMessages } from "./HawaiiMessages"
import { HawaiiCountyCode } from "./HawaiiCountyCode"

export const hawai_en = RegionMessages.create<HawaiiMessages>("Hawaii", {
  [HawaiiCountyCode.Honolulu]: honolulu_en
})
