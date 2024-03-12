import { HawaiiCountyCode } from "./HawaiiCountyCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export type HawaiiMessages = { [key in HawaiiCountyCode]: DepartmentMessages }
