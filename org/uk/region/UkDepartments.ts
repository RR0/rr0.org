import { Department } from "../../country/region/department/Department.js"
import { englandDepartments } from "./eng/EnglandDepartments.js"

export const ukDepartments: Department[] = [
  ...englandDepartments
]
