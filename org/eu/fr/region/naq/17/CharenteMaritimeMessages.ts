import { CharenteMaritimeCityCode } from "./CharenteMaritimeCityCode"
import { stMartinDeRe17Messages } from "./stmartindere/StMartinDeReMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { saintJeanAngelyMessages } from "./SaintJeanAngely/SaintJeanAngelyMessages"

type CharenteCityMessagesList = { [key in CharenteMaritimeCityCode]: OrganizationMessages }
const charenteCityMessages: CharenteCityMessagesList = {
  [CharenteMaritimeCityCode.StMartinDeRe]: stMartinDeRe17Messages,
  [CharenteMaritimeCityCode.SaintJeanAngely]: saintJeanAngelyMessages
}
export const charenteMaritimeMessages = DepartmentMessages.create<CharenteCityMessagesList>("Charente-Maritime",
  charenteCityMessages)
