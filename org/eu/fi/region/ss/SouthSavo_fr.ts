import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { pieksamakiMessages_fr } from "./Pieksamaki/PieksamakiMessages_fr.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode.js"

export const southSavo_fr = new RegionMessages<DepartmentMessages>(["Savonie du Sud"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_fr
})
