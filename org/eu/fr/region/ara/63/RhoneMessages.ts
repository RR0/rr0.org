import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { riomMessages } from "./riom/RiomMessages"
import { PuyDeDomeCityCode } from "./PuyDeDomeCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export const puyDeDomeCityMessages: PuyDeDomeCityMessagesList = {
  [PuyDeDomeCityCode.Riom]: riomMessages
}

export type PuyDeDomeCityMessagesList = { [key in PuyDeDomeCityCode]: CityMessages }

export const puyDeDomeMessages = new DepartmentMessages<PuyDeDomeCityMessagesList>("Rhône", puyDeDomeCityMessages)
