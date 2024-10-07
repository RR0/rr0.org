import { riomMessages } from "./Riom/RiomMessages.js"
import { PuyDeDomeCityCode } from "./PuyDeDomeCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { billomMessages } from "./Billom/BillomMessages.js"
import { chatelGuyonMessages } from "./ChatelGuyon/ChatelGuyonMessages.js"

type DepCityMessages = { [key in PuyDeDomeCityCode]: CityMessages }
export const puyDeDomeMessages = DepartmentMessages.create<DepCityMessages>("Puy-de-Dôme", {
  [PuyDeDomeCityCode.Riom]: riomMessages,
  [PuyDeDomeCityCode.Billom]: billomMessages,
  [PuyDeDomeCityCode.ChatelGuyon]: chatelGuyonMessages
})
