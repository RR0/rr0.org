import { RegionMessages } from "../../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { creuseMessages } from "./23/CreuseCityMessages"
import { charenteMessages } from "./16/CharenteMessages"
import { NouvelleAquitaineDepartmentCode } from "./NouvelleAquitaineDepartmentCode"
import { landesMessages } from "./40/LandesMessages"

export type NouvelleAquitaineDepartmentMessagesList = { [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages }

export const nouvelleAquitaineMessageList: NouvelleAquitaineDepartmentMessagesList = {
  [NouvelleAquitaineDepartmentCode.Charente]: charenteMessages,
  [NouvelleAquitaineDepartmentCode.Creuse]: creuseMessages,
  [NouvelleAquitaineDepartmentCode.Landes]: landesMessages
}

export const nouvelleAquitaineMessages = new RegionMessages("Nouvelle Aquitaine", nouvelleAquitaineMessageList)
