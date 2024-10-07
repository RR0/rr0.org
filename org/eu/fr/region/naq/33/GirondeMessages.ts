import { stAndreDeCubzacMessages } from "./StAndreDeCubzac/StAndreDeCubzacMessages.js"
import { GirondeCityCode } from "./GirondeCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { etauliersMessages } from "./Etauliers/EtauliersMessages.js"
import { cestasMessages } from "./Cestas/CestasMessages.js"

type GirondeCityMessagesList = { [key in GirondeCityCode]: CityMessages }
const girondeCityMessages: GirondeCityMessagesList = {
  [GirondeCityCode.Cestas]: cestasMessages,
  [GirondeCityCode.Etauliers]: etauliersMessages,
  [GirondeCityCode.SaintAndreDeCubzac]: stAndreDeCubzacMessages
}
export const girondeMessages = DepartmentMessages.create<GirondeCityMessagesList>("Gironde", girondeCityMessages)
