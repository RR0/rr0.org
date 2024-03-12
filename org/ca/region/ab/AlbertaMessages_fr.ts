import { RegionMessages } from "../../../country/region/RegionMessages"
import { AlbertaDepartmentCode } from "./AlbertaDepartmentCode"
import { eastmanMessages } from "./eastman/EastmanMessages"

export const albertaMessages_fr = RegionMessages.create("Manitoba", {
  [AlbertaDepartmentCode.eastman]: eastmanMessages
  }
)
