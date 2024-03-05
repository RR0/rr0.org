import { RegionMessages } from "../../../country/region/RegionMessages"
import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode"
import { eastmanMessages } from "./eastman/EastmanMessages"

export const manitobaMessages_en = RegionMessages.create("Manitoba", {
    [ManitobaDepartmentCode.eastman]: eastmanMessages
  }
)
