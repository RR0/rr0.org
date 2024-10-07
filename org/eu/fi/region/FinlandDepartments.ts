import { southSavoDepartments } from "./ss/SouthSavoDepartments.js"
import { pirkanmaaDepartments } from "./p/PirkanmaaDepartments.js"
import { northKareliaDepartments } from "./nk/NorthKareliaDepartments.js"

export const finlandDepartments = {
  ...northKareliaDepartments,
  ...pirkanmaaDepartments,
  ...southSavoDepartments
}
