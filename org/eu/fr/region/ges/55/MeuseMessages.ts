import { MeuseCityCode } from "./MeuseCityCode"
import { vaucouleursMessages } from "./Vaucouleurs/VaucouleursMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { voidVaconMessages } from "./VoidVacon/VoidVaconMessages"

type DepMessages = { [key in MeuseCityCode]: CityMessages }
export const meuseMessages = DepartmentMessages.create<DepMessages>("Meuse", {
  [MeuseCityCode.Vaucouleurs]: vaucouleursMessages,
  [MeuseCityCode.VoidVacon]: voidVaconMessages
})
