import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode"
import { cosnesEtRomainMessages } from "./cosnesetromain/CosnesEtRomainMessages"

export type MeurtheEtMoselleCityList<T> = {
  [key in MeurtheEtMoselleCityCode]: T
}

export const meurtheEtMoselleCityMessages: MeurtheEtMoselleCityList<CityMessages> = {
  [MeurtheEtMoselleCityCode.CosnesEtRomain]: cosnesEtRomainMessages
}

export const meurtheEtMoselleMessages = new DepartmentMessages<MeurtheEtMoselleCityList<CityMessages>>(
  "Meurthe-et-Moselle", meurtheEtMoselleCityMessages)
