import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode.js"
import { eastmanMessages } from "./eastman/EastmanMessages.js"

export const manitobaMessages_fr = RegionMessages.create("Manitoba", {
    [ManitobaDepartmentCode.eastman]: eastmanMessages
  }
)
