import { RegionMessages } from "../../../../country/region/RegionMessages"
import { pieksamakiMessages_fr } from "./Pieksamaki/PieksamakiMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode"

export const southSavo_fr = new RegionMessages<DepartmentMessages>(["Savonie du Sud"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_fr
})
