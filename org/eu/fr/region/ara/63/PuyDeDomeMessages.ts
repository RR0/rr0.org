import { riomMessages } from "./Riom/RiomMessages"
import { PuyDeDomeCityCode } from "./PuyDeDomeCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { billomMessages } from "./Billom/BillomMessages"
import { chatelGuyonMessages } from "./ChatelGuyon/ChatelGuyonMessages"

type DepCityMessages = { [key in PuyDeDomeCityCode]: CityMessages }
export const puyDeDomeMessages = DepartmentMessages.create<DepCityMessages>("Puy-de-Dôme", {
  [PuyDeDomeCityCode.Riom]: riomMessages,
  [PuyDeDomeCityCode.Billom]: billomMessages,
  [PuyDeDomeCityCode.ChatelGuyon]: chatelGuyonMessages
})
