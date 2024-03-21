import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { YonneCityCode } from "./YonneCityCode"
import { provencyMessages } from "./Provency/ProvencyMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { avallonMessages } from "./Avallon/AvallonMessages"
import { flognyLaChapelleMessages } from "./FlognyLaChapelle/FlognyLaChapelleMessages"
import { villy89Messages } from "./Villy/VillyMessages"
import { saintMore89Messages } from "./SaintMore/SaintMoreMessages"
import { vermenton89Messages } from "./Vermenton/VermentonMessages"
import { precyLeSecMessages } from "./PrecyLeSec/PrecyLeSecMessages"
import { jouxLaVilleMessages } from "./JouxLaVille/JouxLaVilleMessages"

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
