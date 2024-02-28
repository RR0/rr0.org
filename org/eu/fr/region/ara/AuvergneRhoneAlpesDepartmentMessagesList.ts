import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"

export interface AuvergneRhoneAlpesDepartementMessages extends DepartmentMessages {
}

export type AuvergneRhoneAlpesDepartmenList<T> = { [key in AuvergneRhoneAlpesDepartementCode]: T }

export type AuvergneRhoneAlpesDepartmentMessagesList = AuvergneRhoneAlpesDepartmenList<AuvergneRhoneAlpesDepartementMessages>
