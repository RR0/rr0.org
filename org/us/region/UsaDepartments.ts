import { alabamaDepartments } from "./al/AlabamaDepartments"
import { californiaDepartments } from "./ca/CaliforniaDepartments"
import { floridaDepartments } from "./fl/FloridaDepartments"
import { texasDepartments } from "./tx/TexasDepartments"
import { pennsylvaniaDepartments } from "./pa/PennsylvaniaDepartments"

export const usaDepartments = {
  ...alabamaDepartments,
  ...californiaDepartments,
  ...floridaDepartments,
  ...pennsylvaniaDepartments,
  ...texasDepartments
}
