import { CharenteMaritimeCityCode } from "./CharenteMaritimeCityCode"
import { stMartinDeRe17Messages } from "./stmartindere/StMartinDeReMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type CharenteCityMessagesList = { [key in CharenteMaritimeCityCode]: CityMessages }

const charenteCityMessages: CharenteCityMessagesList = {
  [CharenteMaritimeCityCode.StMartinDeRe]: stMartinDeRe17Messages
}

export const charenteMaritimeMessages = new DepartmentMessages<CharenteCityMessagesList>("Charente-Maritime",
  charenteCityMessages)
