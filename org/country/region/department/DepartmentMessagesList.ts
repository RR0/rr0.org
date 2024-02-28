import { DepartmentMessages } from "./DepartmentMessages"
import { FranceDepartementCode } from "../../../eu/fr/region/FranceDepartementCode"

export type DepartmentMessagesList = {
  [key in FranceDepartementCode]: DepartmentMessages
}
