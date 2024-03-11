import { Department } from "../country/region/department/Department"
import { franceDepartments } from "./fr/region/FranceDepartments"
import { finlandDepartments } from "./fi/FinlandDepartments"

export const europeDepartments: Department[] = [
  ...franceDepartments,
  ...finlandDepartments
]
