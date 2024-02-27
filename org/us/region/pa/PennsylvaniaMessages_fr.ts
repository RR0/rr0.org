import { RegionMessages } from "../../../country/region/RegionMessages"
import { westmorelandMessages_en } from "./westmoreland/WestmorelandMessages_en"
import { westmorelandMessages_fr } from "./westmoreland/WestmorelandMessages_fr"

export const pennsylvaniaMessages_fr = new RegionMessages(
  "Pennsylvanie",
  {
    westmoreland: westmorelandMessages_fr
  }
)
