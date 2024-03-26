import { RegionMessages } from "../../../../country/region/RegionMessages"
import { NouvelleAquitaineDepartmentCode } from "./NouvelleAquitaineDepartmentCode"
import { creuseMessages } from "./23/CreuseMessages"
import { charenteMessages } from "./16/CharenteMessages"
import { landesMessages } from "./40/LandesMessages"
import { charenteMaritimeMessages } from "./17/CharenteMaritimeMessages"
import { vienneMessages } from "./86/VienneMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { correzeMessages } from "./19/CorrezeMessages"
import { girondeMessages } from "./33/GirondeMessages"
import { lotEtGaronneMessages } from "./47/LotEtGaronneMessages"
import { dordogneMessages } from "./24/DordogneMessages"
import { pyreneesOrientalesMessages } from "../occ/66/PyreneesOrientalesMessages"

const nouvelleAquitaineMessageList: { [key in NouvelleAquitaineDepartmentCode]: DepartmentMessages<any> } = {
  [NouvelleAquitaineDepartmentCode.Charente]: charenteMessages,
  [NouvelleAquitaineDepartmentCode.CharenteMaritime]: charenteMaritimeMessages,
  [NouvelleAquitaineDepartmentCode.Correze]: correzeMessages,
  [NouvelleAquitaineDepartmentCode.Creuse]: creuseMessages,
  [NouvelleAquitaineDepartmentCode.Dordogne]: dordogneMessages,
  [NouvelleAquitaineDepartmentCode.Gironde]: girondeMessages,
  [NouvelleAquitaineDepartmentCode.Landes]: landesMessages,
  [NouvelleAquitaineDepartmentCode.LotEtGaronne]: lotEtGaronneMessages,
  [NouvelleAquitaineDepartmentCode.PyreneesAtlantiques]: pyreneesOrientalesMessages,
  [NouvelleAquitaineDepartmentCode.Vienne]: vienneMessages
}
export const nouvelleAquitaineMessages = RegionMessages.create("Nouvelle Aquitaine", nouvelleAquitaineMessageList)
