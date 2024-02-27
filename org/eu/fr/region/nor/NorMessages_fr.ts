import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../country/region/department/city/CityMessages"
import { FranceDepartementCode } from "../FranceDepartementCode"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"
import { calvadosCityMessages_fr } from "./14/CalvadosCityMessages_fr"

export enum NorDepartementCode {
  Calvados = FranceDepartementCode.Calvados
}

export interface NorDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type NorDepartmentMessagesList
  = { [key in NorDepartementCode]: NorDepartementMessages }

export const norDepartementMessages_fr = new DepartmentMessages("Normandie", calvadosCityMessages_fr)
