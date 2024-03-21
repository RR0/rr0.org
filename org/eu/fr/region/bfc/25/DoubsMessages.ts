import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { DoubsCityCode } from "./DoubsCityCode"
import { ouhansMessages } from "./Ouhans/OuhansMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { amathayVesigneuxMessages } from "./AmathayVesigneux/AmathayVesigneuxMessages"

type DepMessagess = { [key in DoubsCityCode]: CityMessages }
export const doubsMessages = DepartmentMessages.create<DepMessagess>("Doubs", {
  [DoubsCityCode.AmathayVesigneux]: amathayVesigneuxMessages,
  [DoubsCityCode.Ouhans]: ouhansMessages
})
