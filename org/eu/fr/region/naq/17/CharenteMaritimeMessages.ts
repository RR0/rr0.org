import { CharenteMaritimeCityCode } from "./CharenteMaritimeCityCode.js"
import { stMartinDeRe17Messages } from "./StMartinDeRe/StMartinDeReMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { saintJeanAngelyMessages } from "./SaintJeanAngely/SaintJeanAngelyMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { mathaMessages } from "./Matha/MathaMessages.js"
import { saujonMessages } from "./Saujon/SaujonMessages.js"

type DepMessages = { [key in CharenteMaritimeCityCode]: CityMessages }
export const charenteMaritimeMessages = DepartmentMessages.create<DepMessages>("Charente-Maritime", {
  [CharenteMaritimeCityCode.Matha]: mathaMessages,
  [CharenteMaritimeCityCode.Saujon]: saujonMessages,
  [CharenteMaritimeCityCode.StMartinDeRe]: stMartinDeRe17Messages,
  [CharenteMaritimeCityCode.SaintJeanAngely]: saintJeanAngelyMessages
})
