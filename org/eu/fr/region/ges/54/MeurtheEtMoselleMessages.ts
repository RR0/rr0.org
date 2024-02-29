import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode"
import { montpellier34Messages } from "../../occ/34/montpellier/MontpellierMessages"

export type MeurtheEtMoselleCityList<T> = {
  [key in MeurtheEtMoselleCityCode]: T
}

export const meurtheEtMoselleCityMessages: MeurtheEtMoselleCityList<CityMessages> = {
  [MeurtheEtMoselleCityCode.Montpellier]: montpellier34Messages
}

export const meurtheEtMoselleMessages = new DepartmentMessages<MeurtheEtMoselleCityList<CityMessages>>(
  "Meurthe-et-Moselle", meurtheEtMoselleCityMessages)
