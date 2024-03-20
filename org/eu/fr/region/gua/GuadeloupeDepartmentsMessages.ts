import { GuadeloupeDepartementCode } from "./GuadeloupeDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export type GuadeloupeDepartmentsMessages = { [key in GuadeloupeDepartementCode]: DepartmentMessages<any> };
