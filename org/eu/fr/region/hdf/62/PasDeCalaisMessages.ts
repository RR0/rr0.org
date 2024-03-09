import { PasDeCalaisCityCode } from "./PasDeCalaisCityCode"
import { saintPolSurTernoiseMessages } from "./saintpolsurternoise/SaintPolSurTernoiseMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type PasDeCalaisCityMessagesList = { [key in PasDeCalaisCityCode]: CityMessages }
const pasDeCalaisCityMessages: PasDeCalaisCityMessagesList = {
  [PasDeCalaisCityCode.SaintPolSurTernoise]: saintPolSurTernoiseMessages
}
export const pasDeCalaisMessages = DepartmentMessages.create<PasDeCalaisCityMessagesList>("Pas-de-Calais",
  pasDeCalaisCityMessages)
