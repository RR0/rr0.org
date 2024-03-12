import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"
import { NorthCaucasusDepartementCode } from "./NorthCaucasusDepartementCode"

export type NorthCaucasusDepartmentMessagesList = { [key in NorthCaucasusDepartementCode]: DepartmentMessages<any> }
