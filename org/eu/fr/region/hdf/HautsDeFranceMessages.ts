import { RegionMessages } from "../../../../country/region/RegionMessages"
import { nordMessages } from "./59/NordMessages"
import { HautsDeFranceDepartmentCode } from "./HautsDeFranceDepartmentCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export type NouvelleAquitaineDepartmentMessagesList = { [key in HautsDeFranceDepartmentCode]: DepartmentMessages<any> }
export const hautsDeFranceMessages = RegionMessages.create<NouvelleAquitaineDepartmentMessagesList>("Hauts-de-France", {
  [HautsDeFranceDepartmentCode.Nord]: nordMessages
})
