import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"

export interface AuvergneRhoneAlpesDepartementMessages extends DepartmentMessages {
}

export type AuvergneRhoneAlpesDepartmenList<T> = DepartmentMessagesList &
  { [key in AuvergneRhoneAlpesDepartementCode]: T }

export type AuvergneRhoneAlpesDepartmentMessagesList = AuvergneRhoneAlpesDepartmenList<AuvergneRhoneAlpesDepartementMessages>
