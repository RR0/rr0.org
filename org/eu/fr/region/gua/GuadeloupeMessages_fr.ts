import { RegionMessages } from "../../../../country/region/RegionMessages"
import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode"
import { guadeloupe971Messages_fr } from "./971/GuadeloupeMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

const laReunionDepartmentsMessages_fr: { [key in GuadeloupeDepartementCode]: DepartmentMessages<any> } = {
  [GuadeloupeDepartementCode.Guadeloupe]: guadeloupe971Messages_fr
}
export const guadeloupeMessages_fr = RegionMessages.create<{ [key in GuadeloupeDepartementCode]: DepartmentMessages<any> }>(
  "Guadeloupe", laReunionDepartmentsMessages_fr
)
