import { RegionMessages } from "../../../country/region/RegionMessages"
import { AlbertaDepartmentCode } from "./AlbertaDepartmentCode"
import { eastmanMessages } from "./eastman/EastmanMessages"

export const albertaMessages_en = RegionMessages.create("Manitoba", {
  [AlbertaDepartmentCode.eastman]: eastmanMessages
  }
)
