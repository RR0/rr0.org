import { MiddlesexCityCode } from "./middlesex/MiddlesexCityCode"
import { MassachusettsCountyCode } from "./MassachusettsCounties"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export type MassachusettsCityCode = MiddlesexCityCode
export type MassachusettsCountyMessages = { [key in MassachusettsCountyCode]: DepartmentMessages }
