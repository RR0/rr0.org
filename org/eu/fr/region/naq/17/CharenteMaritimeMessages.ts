import { CharenteMaritimeCityCode } from "./CharenteMaritimeCityCode"
import { stMartinDeRe17Messages } from "./stmartindere/StMartinDeReMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

type CharenteCityMessagesList = { [key in CharenteMaritimeCityCode]: OrganizationMessages }
const charenteCityMessages: CharenteCityMessagesList = {
  [CharenteMaritimeCityCode.StMartinDeRe]: stMartinDeRe17Messages
}
export const charenteMaritimeMessages = DepartmentMessages.create<CharenteCityMessagesList>("Charente-Maritime",
  charenteCityMessages)
