import { RegionMessages } from "../../../../country/region/RegionMessages"
import { bourgogneFrancheComteDepartementsMessageList } from "./BourgogneFrancheComteDepartementsMessageList"
import { BourgogneFrancheComteDepartementCode } from "./BourgogneFrancheComteDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export type BourgogneFrancheComteDepartmentMessagesList = { [key in BourgogneFrancheComteDepartementCode]: DepartmentMessages }
export const bourgogneFrancheComteMessages = RegionMessages.create<BourgogneFrancheComteDepartmentMessagesList>(
  "Bourgogne-Franche-Comté",
  bourgogneFrancheComteDepartementsMessageList
)
