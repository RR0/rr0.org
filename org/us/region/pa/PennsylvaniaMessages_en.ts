import { RegionMessages } from "../../../country/region/RegionMessages"
import { westmorelandMessages_en } from "./westmoreland/WestmorelandMessages_en"

export const pennsylvaniaMessages_en = new RegionMessages(
  "Pennsylvania",
  {
    westmoreland: westmorelandMessages_en
  }
)
