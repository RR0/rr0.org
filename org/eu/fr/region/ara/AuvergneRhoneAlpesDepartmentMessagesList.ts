import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"

export interface AuvergneRhoneAlpesDepartementMessages extends DepartmentMessages {
}

export type AuvergneRhoneAlpesDepartmentMessagesList = DepartmentMessagesList &
  { [key in AuvergneRhoneAlpesDepartementCode]: AuvergneRhoneAlpesDepartementMessages }
