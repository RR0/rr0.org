import { RegionMessages } from "../../../../country/region/RegionMessages"
import { nordMessages } from "./59/NordMessages"
import { HautsDeFranceDepartmentCode } from "./HautsDeFranceDepartmentCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { pasDeCalaisMessages } from "./62/PasDeCalaisMessages"
import { sommeMessages } from "./80/SommeMessages"
import { aisneMessages } from "./02/AisneMessages"

export type NouvelleAquitaineDepartmentMessagesList = { [key in HautsDeFranceDepartmentCode]: DepartmentMessages<any> }
export const hautsDeFranceMessages = RegionMessages.create<NouvelleAquitaineDepartmentMessagesList>("Hauts-de-France", {
  [HautsDeFranceDepartmentCode.Aisne]: aisneMessages,
  [HautsDeFranceDepartmentCode.PasDeCalais]: pasDeCalaisMessages,
  [HautsDeFranceDepartmentCode.Nord]: nordMessages,
  [HautsDeFranceDepartmentCode.Somme]: sommeMessages
})
