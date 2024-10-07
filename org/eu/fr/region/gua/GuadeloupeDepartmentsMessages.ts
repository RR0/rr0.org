import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export type GuadeloupeDepartmentsMessages = { [key in GuadeloupeDepartementCode]: DepartmentMessages<any> };
