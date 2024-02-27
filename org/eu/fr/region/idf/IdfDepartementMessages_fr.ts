import { IdfDepartementCode } from "./IdfDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../country/region/department/city/CityMessages"
import { HautDeSeineCityCode } from "./92/HautDeSeineCityCode"
import { OiseVilleCode } from "./60/OiseVilleCode"
import { DepartmentMessagesList } from "../../../../country/region/department/DepartmentMessagesList"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"

export enum SartheVilleCode {
  LeMans = 72000
}

export interface IdfDepartementMessages extends DepartmentMessages<CityMessagesList> {
  city: CityMessagesList
}

export type IdfDepartmentMessagesList
  = DepartmentMessagesList & { [key in IdfDepartementCode]: IdfDepartementMessages }

export type HautDeSeineCityMessagesList = {
  [key in HautDeSeineCityCode]: CityMessages
}
export type OiseVilleMessagesList = {
  [key in OiseVilleCode]: CityMessages
}
