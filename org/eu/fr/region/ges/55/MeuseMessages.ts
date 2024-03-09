import { MeuseCityCode } from "./MeuseCityCode"
import { vaucouleursMessages } from "./vaucouleurs/VaucouleursMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const meuseMessages = DepartmentMessages.create("Meurthe-et-Moselle", {
  [MeuseCityCode.Vaucouleurs]: vaucouleursMessages
})
