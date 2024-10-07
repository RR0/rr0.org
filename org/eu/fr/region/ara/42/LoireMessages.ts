import { stEtienne42Messages } from "./SaintEtienne/SaintEtienneMessages.js"
import { LoireCityCode } from "./LoireCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { roanneMessages } from "./Roanne/RoanneMessages.js"
import { montbrison42Messages } from "./Montbrison/MontbrisonMessages.js"

type LoireMessages = { [key in LoireCityCode]: CityMessages }
export const loireMessages = DepartmentMessages.create<LoireMessages>("Loire", {
  [LoireCityCode.Montbrison]: montbrison42Messages,
  [LoireCityCode.Roanne]: roanneMessages,
  [LoireCityCode.StEtienne]: stEtienne42Messages
})
