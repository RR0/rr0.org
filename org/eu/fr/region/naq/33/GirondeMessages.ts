import { saintAndreDeCubzacMessages } from "./saintandredecubzac/SaintAndreDeCubzacMessages"
import { GirondeCityCode } from "./GirondeCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { etauliersMessages } from "./etauliers/EtauliersMessages"

type GirondeCityMessagesList = { [key in GirondeCityCode]: CityMessages }
const girondeCityMessages: GirondeCityMessagesList = {
  [GirondeCityCode.Etauliers]: etauliersMessages,
  [GirondeCityCode.SaintAndreDeCubzac]: saintAndreDeCubzacMessages
}
export const girondeMessages = DepartmentMessages.create<GirondeCityMessagesList>("Gironde", girondeCityMessages)
