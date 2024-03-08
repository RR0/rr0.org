import { alabamaDepartments } from "./al/AlabamaDepartments"
import { californiaDepartments } from "./ca/CaliforniaDepartments"
import { floridaDepartments } from "./fl/FloridaDepartments"
import { texasDepartments } from "./tx/TexasDepartments"
import { pennsylvaniaDepartments } from "./pa/PennsylvaniaDepartments"
import { washingtonDepartments } from "./wa/WashingtonDepartments"
import { Organization } from "../../Organization"
import { newMexicoDepartments } from "./nm/NewMexicoDepartments"

export const usaDepartments: Organization[] = [
  ...alabamaDepartments,
  ...californiaDepartments,
  ...floridaDepartments,
  ...pennsylvaniaDepartments,
  ...newMexicoDepartments,
  ...texasDepartments,
  ...washingtonDepartments
]
