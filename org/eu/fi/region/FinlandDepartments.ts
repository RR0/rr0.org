import { southSavoDepartments } from "./ss/SouthSavoDepartments"
import { pirkanmaaDepartments } from "./p/PirkanmaaDepartments"
import { northKareliaDepartments } from "./nk/NorthKareliaDepartments"

export const finlandDepartments = {
  ...northKareliaDepartments,
  ...pirkanmaaDepartments,
  ...southSavoDepartments
}
