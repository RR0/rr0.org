import { MasonCityCode } from "./MasonCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { pointPleasantMessages } from "./PointPleasant/PointPleasantMessages"

export const mason_fr = DepartmentMessages.create("Comté de Fayette", {
  [MasonCityCode.PointPleasant]: pointPleasantMessages
})
