import { CharenteCityCode } from "./CharenteCityCode"
import { montigne16Messages } from "./montigne/MontigneMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { villeboisLavalette16Messages } from "./villeboislavalette/MontigneMessages"

type CharenteCityMessagesList = { [key in CharenteCityCode]: OrganizationMessages }
const charenteCityMessages: CharenteCityMessagesList = {
  [CharenteCityCode.Montigne]: montigne16Messages,
  [CharenteCityCode.VilleboisLavalette]: villeboisLavalette16Messages
}
export const charenteMessages = DepartmentMessages.create<CharenteCityMessagesList>("Charente", charenteCityMessages)
