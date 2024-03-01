import { RegionMessages } from "../../../../country/region/RegionMessages"
import { hautsDeSeineMessages } from "./92/HautsDeSeineMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"
import { IdfDepartmentCode } from "./IdfDepartmentCode"
import { oiseMessages } from "./60/OiseCityMessages"
import { parisMessages } from "./75/ParisMessages"
import { yvelinesMessages } from "./78/YvelinesCityMessages"

export interface IdfDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type IdfDepartmentMessagesList = & { [key in IdfDepartmentCode]: IdfDepartementMessages }

export const idfDepartmentMessages: IdfDepartmentMessagesList = {
  [IdfDepartmentCode.Oise]: oiseMessages,
  [IdfDepartmentCode.HautsDeSeine]: hautsDeSeineMessages,
  [IdfDepartmentCode.Paris]: parisMessages,
  [IdfDepartmentCode.Yvelines]: yvelinesMessages
}

export const idfMessages = new RegionMessages<IdfDepartmentMessagesList>("Île-de-France", idfDepartmentMessages)
