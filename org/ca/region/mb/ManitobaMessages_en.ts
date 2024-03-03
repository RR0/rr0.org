import { RegionMessages } from "../../../country/region/RegionMessages"
import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode"
import { eastmanCityMessages } from "./eastman/EastmanCityMessages"

export const manitobaMessages_en = RegionMessages.create(
  "Manitoba",
  {
    [ManitobaDepartmentCode.eastman]: eastmanCityMessages
  }
)
