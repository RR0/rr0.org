import { Department } from "../../../../country/region/department/Department"
import { AuvergneRhoneAlpesDepartmenList } from "./AuvergneRhoneAlpesDepartmentMessagesList"
import { loire } from "./42/Loire"
import { rhone } from "./69/Rhone"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"

export const auvergneRhoneAlpesDepartments: AuvergneRhoneAlpesDepartmenList<Department> = {
  [AuvergneRhoneAlpesDepartementCode.Loire]: loire,
  [AuvergneRhoneAlpesDepartementCode.Rhone]: rhone
}
