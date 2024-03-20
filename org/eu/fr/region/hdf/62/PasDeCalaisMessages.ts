import { PasDeCalaisCityCode } from "./PasDeCalaisCityCode"
import { saintPolSurTernoiseMessages } from "./SaintPolSurTernoise/SaintPolSurTernoiseMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { calaisMessages } from "./Calais/CalaisMessages"
import { neuvilleSaintVaastMessages } from "./NeuvilleSaintVaast/NeuvilleSaintVaastMessages"

type PasDeCalaisCityMessagesList = { [key in PasDeCalaisCityCode]: CityMessages }
const pasDeCalaisCityMessages: PasDeCalaisCityMessagesList = {
  [PasDeCalaisCityCode.Calais]: calaisMessages,
  [PasDeCalaisCityCode.NeuvilleSaintVaast]: neuvilleSaintVaastMessages,
  [PasDeCalaisCityCode.SaintPolSurTernoise]: saintPolSurTernoiseMessages
}
export const pasDeCalaisMessages = DepartmentMessages.create<PasDeCalaisCityMessagesList>("Pas-de-Calais",
  pasDeCalaisCityMessages)
