import { LaReunionCityCode } from "./LaReunionCityCode"
import { steMarie874Messages } from "./stmarie/SteMarieMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

export const laReunionCityMessages_fr: { [key in LaReunionCityCode]: CityMessages } = {
  [LaReunionCityCode.SteMarie]: steMarie874Messages
}

export const laReunion974Messages_fr = new DepartmentMessages("La Réunion", laReunionCityMessages_fr)
