import { stAndreDeCubzacMessages } from "./StAndreDeCubzac/StAndreDeCubzacMessages"
import { GirondeCityCode } from "./GirondeCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { etauliersMessages } from "./Etauliers/EtauliersMessages"
import { cestasMessages } from "./Cestas/CestasMessages"

type GirondeCityMessagesList = { [key in GirondeCityCode]: CityMessages }
const girondeCityMessages: GirondeCityMessagesList = {
  [GirondeCityCode.Cestas]: cestasMessages,
  [GirondeCityCode.Etauliers]: etauliersMessages,
  [GirondeCityCode.SaintAndreDeCubzac]: stAndreDeCubzacMessages
}
export const girondeMessages = DepartmentMessages.create<GirondeCityMessagesList>("Gironde", girondeCityMessages)
