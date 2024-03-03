import { RegionMessages } from "../../../../country/region/RegionMessages"
import { hautsDeSeineMessages } from "./92/HautsDeSeineMessages"
import { IdfDepartmentCode } from "./IdfDepartmentCode"
import { oiseMessages } from "./60/OiseCityMessages"
import { parisMessages } from "./75/ParisMessages"
import { yvelinesMessages } from "./78/YvelinesCityMessages"
import { DepartmentMessages } from "../../../../country/region/department/city/DepartmentMessages"

export type IdfDepartmentMessagesList = & { [key in IdfDepartmentCode]: DepartmentMessages<any> }

export const idfDepartmentMessages: IdfDepartmentMessagesList = {
  [IdfDepartmentCode.Oise]: oiseMessages,
  [IdfDepartmentCode.HautsDeSeine]: hautsDeSeineMessages,
  [IdfDepartmentCode.Paris]: parisMessages,
  [IdfDepartmentCode.Yvelines]: yvelinesMessages
}

export const idfMessages = RegionMessages.create<IdfDepartmentMessagesList>("Île-de-France", idfDepartmentMessages)
