import { CharenteCityCode } from "./CharenteCityCode.js"
import { montigne16Messages } from "./Montigne/MontigneMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { villeboisLavalette16Messages } from "./Villeboislavalette/MontigneMessages.js"
import { rouillac16Messages } from "./Rouillac/RouillacMessages.js"
import { angouleme16Messages } from "./Angouleme/AngoulemeMessages.js"

type CharenteCityMessagesList = { [key in CharenteCityCode]: OrganizationMessages }
export const charenteMessages = DepartmentMessages.create<CharenteCityMessagesList>("Charente", {
  [CharenteCityCode.Angouleme]: angouleme16Messages,
  [CharenteCityCode.Montigne]: montigne16Messages,
  [CharenteCityCode.Rouillac]: rouillac16Messages,
  [CharenteCityCode.VilleboisLavalette]: villeboisLavalette16Messages
})
