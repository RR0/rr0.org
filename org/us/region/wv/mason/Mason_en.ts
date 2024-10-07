import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { MasonCityCode } from "./MasonCityCode.js"
import { pointPleasantMessages } from "./PointPleasant/PointPleasantMessages.js"

export const mason_en = DepartmentMessages.create("Fayette County", {
  [MasonCityCode.PointPleasant]: pointPleasantMessages
})
