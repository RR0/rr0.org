import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { ArlingtonCityCode } from "./ArlingtonCityCode"
import { pentagon_en } from "./pentagon/Pentagon_en"

export const arlington_en = DepartmentMessages.create("Arlington County", {
  [ArlingtonCityCode.Pentagon]: pentagon_en
})
