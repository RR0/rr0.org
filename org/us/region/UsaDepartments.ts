import { alabamaDepartments } from "./al/AlabamaDepartments"
import { californiaDepartments } from "./ca/CaliforniaDepartments"
import { floridaDepartments } from "./fl/FloridaDepartments"
import { texasDepartments } from "./tx/TexasDepartments"
import { pennsylvaniaDepartments } from "./pa/PennsylvaniaDepartments"
import { Department } from "../../country/region/department/Department"

export const usaDepartments: Department[] = [
  ...alabamaDepartments,
  ...californiaDepartments,
  ...floridaDepartments,
  ...pennsylvaniaDepartments,
  ...texasDepartments
]
