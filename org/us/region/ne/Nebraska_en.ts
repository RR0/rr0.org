import { RegionMessages } from "../../../country/region/RegionMessages"
import { scottsBluff_en } from "./ScottsBluff/ScottsBluff_en"
import { NebraskaCountyCode } from "./NebraskaCountyCode"

export const nebraska_en = RegionMessages.create("Nebraska", {
    [NebraskaCountyCode.Scottsbluff]: scottsBluff_en
  }
)
