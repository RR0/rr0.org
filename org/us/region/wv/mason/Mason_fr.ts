import { MasonCityCode } from "./MasonCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { pointPleasantMessages } from "./PointPleasant/PointPleasantMessages.js"

export const mason_fr = DepartmentMessages.create("Comté de Fayette", {
  [MasonCityCode.PointPleasant]: pointPleasantMessages
})
