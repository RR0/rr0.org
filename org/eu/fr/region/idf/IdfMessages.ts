import { RegionMessages } from "../../../../country/region/RegionMessages"
import { hautsDeSeineMessages } from "./92/HautsDeSeineMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { CityMessagesList } from "../../../../country/region/department/city/CityMessagesList"
import { IdfDepartmentCode } from "./IdfDepartmentCode"
import { oiseMessages } from "./60/OiseCityMessages"


export interface IdfDepartementMessages extends DepartmentMessages {
  city: CityMessagesList
}

export type IdfDepartmentMessagesList = & { [key in IdfDepartmentCode]: IdfDepartementMessages }

export const idfDepartmentMessages: IdfDepartmentMessagesList = {
  60: oiseMessages,
  92: hautsDeSeineMessages
}

export const idfMessages = new RegionMessages<IdfDepartmentMessagesList>("Île-de-France", idfDepartmentMessages)
