import { RegionMessages } from "../../../../country/region/RegionMessages"
import { hautsDeSeineMessages } from "./92/HautsDeSeineMessages"
import { IdfDepartmentCode } from "./IdfDepartmentCode"
import { oiseMessages } from "./60/OiseCityMessages"
import { parisMessages } from "./75/ParisMessages"
import { yvelinesMessages } from "./78/YvelinesCityMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { seineEtMarneMessages } from "./77/SeineEtMarneMessages"
import { valDOiseMessages } from "./95/ValDOiseMessages"
import { essonneMessages } from "./91/EssonneMessages"

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
