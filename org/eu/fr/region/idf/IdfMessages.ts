import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { hautsDeSeineMessages } from "./92/HautsDeSeineMessages.js"
import { IdfDepartmentCode } from "./IdfDepartmentCode.js"
import { oiseMessages } from "./60/OiseCityMessages.js"
import { parisMessages } from "./75/ParisMessages.js"
import { yvelinesMessages } from "./78/YvelinesCityMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { seineEtMarneMessages } from "./77/SeineEtMarneMessages.js"
import { valDOiseMessages } from "./95/ValDOiseMessages.js"
import { essonneMessages } from "./91/EssonneMessages.js"

type IdfDepartmentMessagesList = & { [key in IdfDepartmentCode]: DepartmentMessages<any> }
const idfDepartmentMessages: IdfDepartmentMessagesList = {
  [IdfDepartmentCode.Essonne]: essonneMessages,
  [IdfDepartmentCode.Oise]: oiseMessages,
  [IdfDepartmentCode.HautsDeSeine]: hautsDeSeineMessages,
  [IdfDepartmentCode.Paris]: parisMessages,
  [IdfDepartmentCode.SeineEtMarne]: seineEtMarneMessages,
  [IdfDepartmentCode.ValDOise]: valDOiseMessages,
  [IdfDepartmentCode.Yvelines]: yvelinesMessages
}
export const idfMessages = RegionMessages.create<IdfDepartmentMessagesList>("Île-de-France", idfDepartmentMessages)
