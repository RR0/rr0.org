import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { AuvergneRhoneAlpesDepartementCode } from "./AuvergneRhoneAlpesDepartementCode"

interface AuvergneRhoneAlpesDepartementMessages extends DepartmentMessages {
}

type AuvergneRhoneAlpesDepartmentList<T> = { [key in AuvergneRhoneAlpesDepartementCode]: T }

export type AuvergneRhoneAlpesDepartmentMessagesList = AuvergneRhoneAlpesDepartmentList<AuvergneRhoneAlpesDepartementMessages>
