import { northKareliaDepartments } from "./region/nk/NorthKareliaDepartments.js"
import { Organization } from "../../Organization.js"
import { pirkanmaaDepartments } from "./region/p/PirkanmaaDepartments.js"
import { southSavoDepartments } from "./region/ss/SouthSavoDepartments.js"

export const finlandDepartments: Organization[] = [
  ...northKareliaDepartments,
  ...pirkanmaaDepartments,
  ...southSavoDepartments
]
