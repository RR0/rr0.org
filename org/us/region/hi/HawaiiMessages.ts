import { HawaiiCountyCode } from "./HawaiiCountyCode.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export type HawaiiMessages = { [key in HawaiiCountyCode]: DepartmentMessages }
