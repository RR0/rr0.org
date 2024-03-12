import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { MasonCityCode } from "./MasonCityCode"
import { pointPleasantMessages } from "./PointPleasant/PointPleasantMessages"

export const mason_en = DepartmentMessages.create("Fayette County", {
  [MasonCityCode.PointPleasant]: pointPleasantMessages
})
