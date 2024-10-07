import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { DoubsCityCode } from "./DoubsCityCode.js"
import { ouhansMessages } from "./Ouhans/OuhansMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { amathayVesigneuxMessages } from "./AmathayVesigneux/AmathayVesigneuxMessages.js"

type DepMessagess = { [key in DoubsCityCode]: CityMessages }
export const doubsMessages = DepartmentMessages.create<DepMessagess>("Doubs", {
  [DoubsCityCode.AmathayVesigneux]: amathayVesigneuxMessages,
  [DoubsCityCode.Ouhans]: ouhansMessages
})
