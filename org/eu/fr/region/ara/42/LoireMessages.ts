import { stEtienne42Messages } from "./SaintEtienne/SaintEtienneMessages"
import { LoireCityCode } from "./LoireCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { roanneMessages } from "./Roanne/RoanneMessages"
import { montbrison42Messages } from "./Montbrison/MontbrisonMessages"

type LoireMessages = { [key in LoireCityCode]: CityMessages }
export const loireMessages = DepartmentMessages.create<LoireMessages>("Loire", {
  [LoireCityCode.Montbrison]: montbrison42Messages,
  [LoireCityCode.Roanne]: roanneMessages,
  [LoireCityCode.StEtienne]: stEtienne42Messages
})
