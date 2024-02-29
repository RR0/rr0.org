import { RegionMessages } from "../../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { NouvelleAquitaineDepartmentCode } from "./NouvelleAquitaineDepartmentCode"
import { creuseMessages } from "./23/CreuseCityMessages"
import { charenteMessages } from "./16/CharenteMessages"
import { landesMessages } from "./40/LandesMessages"
import { charenteMaritimeMessages } from "./17/CharenteMaritimeMessages"

export type NouvelleAquitaineDepartmentMessagesList = { [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages }

export const nouvelleAquitaineMessageList: NouvelleAquitaineDepartmentMessagesList = {
  [NouvelleAquitaineDepartmentCode.Charente]: charenteMessages,
  [NouvelleAquitaineDepartmentCode.CharenteMaritime]: charenteMaritimeMessages,
  [NouvelleAquitaineDepartmentCode.Creuse]: creuseMessages,
  [NouvelleAquitaineDepartmentCode.Landes]: landesMessages
}

export const nouvelleAquitaineMessages = new RegionMessages("Nouvelle Aquitaine", nouvelleAquitaineMessageList)
