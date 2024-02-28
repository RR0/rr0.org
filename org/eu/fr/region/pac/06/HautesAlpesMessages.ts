import { cannesMessages } from "./cannes/CannesMessages"
import { AlpesMaritimesCityCode } from "./AlpesMaritimesCityCode"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export type alpesMaritimesCityList<T> = { [key in AlpesMaritimesCityCode]: T }

export const alpesMaritimesCityMessages: alpesMaritimesCityList<CityMessages> = {
  [AlpesMaritimesCityCode.Cannes]: cannesMessages
}

export const alpesMaritimesMessages = new DepartmentMessages<alpesMaritimesCityList<CityMessages>>("Alpes Maritimes",
  alpesMaritimesCityMessages)
