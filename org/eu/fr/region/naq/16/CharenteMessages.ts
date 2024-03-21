import { CharenteCityCode } from "./CharenteCityCode"
import { montigne16Messages } from "./Montigne/MontigneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { villeboisLavalette16Messages } from "./Villeboislavalette/MontigneMessages"
import { rouillac16Messages } from "./Rouillac/RouillacMessages"
import { angouleme16Messages } from "./Angouleme/AngoulemeMessages"

type CharenteCityMessagesList = { [key in CharenteCityCode]: OrganizationMessages }
export const charenteMessages = DepartmentMessages.create<CharenteCityMessagesList>("Charente", {
  [CharenteCityCode.Angouleme]: angouleme16Messages,
  [CharenteCityCode.Montigne]: montigne16Messages,
  [CharenteCityCode.Rouillac]: rouillac16Messages,
  [CharenteCityCode.VilleboisLavalette]: villeboisLavalette16Messages
})
