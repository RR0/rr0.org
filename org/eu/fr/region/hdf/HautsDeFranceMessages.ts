import { RegionMessages } from "../../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { nordMessages } from "./59/NordMessages"
import { HautsDeFranceDepartmentCode } from "./HautsDeFranceDepartmentCode"

export type NouvelleAquitaineDepartmentMessagesList = { [key in HautsDeFranceDepartmentCode]: DepartmentMessages }

export const hautsDeFranceMessageList: NouvelleAquitaineDepartmentMessagesList = {
  [HautsDeFranceDepartmentCode.Nord]: nordMessages
}

export const hautsDeFranceMessages = new RegionMessages("Hauts-de-France", hautsDeFranceMessageList)
