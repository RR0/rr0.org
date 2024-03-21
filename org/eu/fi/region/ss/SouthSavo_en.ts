import { RegionMessages } from "../../../../country/region/RegionMessages"
import { pieksamakiMessages_en } from "./Pieksamaki/PieksamakiMessages_en"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const southSavo_en = new RegionMessages<DepartmentMessages>(["South Savo", "Southern Savonia"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_en
})
