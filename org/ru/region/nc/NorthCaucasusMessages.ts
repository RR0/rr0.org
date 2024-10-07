import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"
import { NorthCaucasusDepartementCode } from "./NorthCaucasusDepartementCode.js"

export type NorthCaucasusDepartmentMessagesList = { [key in NorthCaucasusDepartementCode]: DepartmentMessages<any> }
