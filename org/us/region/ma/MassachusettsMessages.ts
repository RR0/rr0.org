import { MiddlesexCityCode } from "./middlesex/MiddlesexCityCode.js"
import { MassachusettsCountyCode } from "./MassachusettsCounties.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export type MassachusettsCityCode = MiddlesexCityCode
export type MassachusettsCountyMessages = { [key in MassachusettsCountyCode]: DepartmentMessages }
