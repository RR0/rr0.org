import { DepartmentMessages } from "./DepartmentMessages.js"
import { FranceDepartementCode } from "../../../eu/fr/region/FranceDepartementCode.js"

export type DepartmentMessagesList = {
  [key in FranceDepartementCode]: DepartmentMessages
}
