import { PasDeCalaisCityCode } from "./PasDeCalaisCityCode.js"
import { saintPolSurTernoiseMessages } from "./SaintPolSurTernoise/SaintPolSurTernoiseMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { calaisMessages } from "./Calais/CalaisMessages.js"
import { neuvilleSaintVaastMessages } from "./NeuvilleSaintVaast/NeuvilleSaintVaastMessages.js"

type PasDeCalaisCityMessagesList = { [key in PasDeCalaisCityCode]: CityMessages }
const pasDeCalaisCityMessages: PasDeCalaisCityMessagesList = {
  [PasDeCalaisCityCode.Calais]: calaisMessages,
  [PasDeCalaisCityCode.NeuvilleSaintVaast]: neuvilleSaintVaastMessages,
  [PasDeCalaisCityCode.SaintPolSurTernoise]: saintPolSurTernoiseMessages
}
export const pasDeCalaisMessages = DepartmentMessages.create<PasDeCalaisCityMessagesList>("Pas-de-Calais",
  pasDeCalaisCityMessages)
