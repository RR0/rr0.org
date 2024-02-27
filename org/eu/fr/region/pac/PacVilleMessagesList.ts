import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../country/region/department/city/CityMessages"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"

export enum PacVilleCode {
  Briancon = "5100"
}

export enum PacDepartementCode {
  HautesAlpes = "05"
}

export type PacDepartmentMessagesList
  = { [key in PacDepartementCode]: PacDepartementMessages }

export interface PacDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type PacVilleMessagesList = {
  [key in PacVilleCode]: CityMessages
}
