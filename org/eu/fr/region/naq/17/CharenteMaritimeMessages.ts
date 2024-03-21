import { CharenteMaritimeCityCode } from "./CharenteMaritimeCityCode"
import { stMartinDeRe17Messages } from "./StMartinDeRe/StMartinDeReMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { saintJeanAngelyMessages } from "./SaintJeanAngely/SaintJeanAngelyMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { mathaMessages } from "./Matha/MathaMessages"
import { saujonMessages } from "./Saujon/SaujonMessages"

type DepMessages = { [key in CharenteMaritimeCityCode]: CityMessages }
export const charenteMaritimeMessages = DepartmentMessages.create<DepMessages>("Charente-Maritime", {
  [CharenteMaritimeCityCode.Matha]: mathaMessages,
  [CharenteMaritimeCityCode.Saujon]: saujonMessages,
  [CharenteMaritimeCityCode.StMartinDeRe]: stMartinDeRe17Messages,
  [CharenteMaritimeCityCode.SaintJeanAngely]: saintJeanAngelyMessages
})
