import { RegionMessages } from "../../../country/region/RegionMessages"
import { westmorelandMessages_en } from "./westmoreland/WestmorelandMessages_en"

export const pennsylvaniaMessages_en = RegionMessages.create(
  "Pennsylvania",
  {
    westmoreland: westmorelandMessages_en
  }
)
