import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { YonneCityCode } from "./YonneCityCode"
import { provencyMessages } from "./Provency/ProvencyMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { avallonMessages } from "./Avallon/AvallonMessages"

type DepMessages = { [key in YonneCityCode]: CityMessages }
export const yonneMessages = DepartmentMessages.create<DepMessages>("Yonne", {
  [YonneCityCode.Avallon]: avallonMessages,
  [YonneCityCode.Provency]: provencyMessages
})
