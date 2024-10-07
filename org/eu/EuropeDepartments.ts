import { Department } from "../country/region/department/Department.js"
import { franceDepartments } from "./fr/region/FranceDepartments.js"
import { finlandDepartments } from "./fi/FinlandDepartments.js"

export const europeDepartments: Department[] = [
  ...franceDepartments,
  ...finlandDepartments
]
