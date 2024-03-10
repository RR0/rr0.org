import { RegionMessages } from "../../../../country/region/RegionMessages"
import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { guadeloupe971Messages_en } from "./971/GuadeloupeMessages_en"

const laReunionDepartmentsMessages_en: { [key in GuadeloupeDepartementCode]: DepartmentMessages<any> } = {
  [GuadeloupeDepartementCode.Guadeloupe]: guadeloupe971Messages_en
}
export const guadeloupeMessages_en = RegionMessages.create<{ [key in GuadeloupeDepartementCode]: DepartmentMessages<any> }>(
  "Guadeloupe", laReunionDepartmentsMessages_en
)
