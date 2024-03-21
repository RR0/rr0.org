import { northKareliaDepartments } from "./region/nk/NorthKareliaDepartments"
import { Organization } from "../../Organization"
import { pirkanmaaDepartments } from "./region/p/PirkanmaaDepartments"
import { southSavoDepartments } from "./region/ss/SouthSavoDepartments"

export const finlandDepartments: Organization[] = [
  ...northKareliaDepartments,
  ...pirkanmaaDepartments,
  ...southSavoDepartments
]
