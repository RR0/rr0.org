import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { AlbertaDepartmentCode } from "./AlbertaDepartmentCode.js"
import { eastmanMessages } from "./eastman/EastmanMessages.js"

export const albertaMessages_fr = RegionMessages.create("Manitoba", {
  [AlbertaDepartmentCode.eastman]: eastmanMessages
  }
)
