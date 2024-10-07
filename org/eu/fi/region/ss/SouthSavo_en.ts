import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { pieksamakiMessages_en } from "./Pieksamaki/PieksamakiMessages_en.js"
import { SouthSavoDepartmentCode } from "./SouthSavoDepartmentCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const southSavo_en = new RegionMessages<DepartmentMessages>(["South Savo", "Southern Savonia"], {
  [SouthSavoDepartmentCode.Pieksamaki]: pieksamakiMessages_en
})
