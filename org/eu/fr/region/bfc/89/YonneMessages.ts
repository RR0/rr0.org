import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { YonneCityCode } from "./YonneCityCode.js"
import { provencyMessages } from "./Provency/ProvencyMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { avallonMessages } from "./Avallon/AvallonMessages.js"
import { flognyLaChapelleMessages } from "./FlognyLaChapelle/FlognyLaChapelleMessages.js"
import { villy89Messages } from "./Villy/VillyMessages.js"
import { saintMore89Messages } from "./SaintMore/SaintMoreMessages.js"
import { vermenton89Messages } from "./Vermenton/VermentonMessages.js"
import { precyLeSecMessages } from "./PrecyLeSec/PrecyLeSecMessages.js"
import { jouxLaVilleMessages } from "./JouxLaVille/JouxLaVilleMessages.js"

type DepMessages = { [key in YonneCityCode]: CityMessages }
export const yonneMessages = DepartmentMessages.create<DepMessages>("Yonne", {
  [YonneCityCode.FlognyLaChapelle]: flognyLaChapelleMessages,
  [YonneCityCode.Avallon]: avallonMessages,
  [YonneCityCode.JouxLaVille]: jouxLaVilleMessages,
  [YonneCityCode.PrecyLeSec]: precyLeSecMessages,
  [YonneCityCode.Provency]: provencyMessages,
  [YonneCityCode.SaintMore]: saintMore89Messages,
  [YonneCityCode.Vermenton]: vermenton89Messages,
  [YonneCityCode.Villy]: villy89Messages
})
