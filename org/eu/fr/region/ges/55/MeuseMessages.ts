import { MeuseCityCode } from "./MeuseCityCode.js"
import { vaucouleursMessages } from "./Vaucouleurs/VaucouleursMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { voidVaconMessages } from "./VoidVacon/VoidVaconMessages.js"
import { gondrecourtLeChateauMessages } from "./GondrecourtLeChateau/GondrecourtLeChateauMessages.js"

type DepMessages = { [key in MeuseCityCode]: CityMessages }
export const meuseMessages = DepartmentMessages.create<DepMessages>("Meuse", {
  [MeuseCityCode.GondrecourtLeChateau]: gondrecourtLeChateauMessages,
  [MeuseCityCode.Vaucouleurs]: vaucouleursMessages,
  [MeuseCityCode.VoidVacon]: voidVaconMessages
})
