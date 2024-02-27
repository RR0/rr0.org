import { IdfDepartmentMessagesList } from "./IdfDepartementMessages_fr"
import { oiseCityMessages_fr } from "./60/OiseCityMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { hautsDeSeineMessages_fr } from "./92/HautsDeSeineMessages_fr"

const oiseMessages_fr = new DepartmentMessages("Oise", oiseCityMessages_fr)

export const idfDepartmentMessageList_fr: IdfDepartmentMessagesList = {
  60: oiseMessages_fr,
  92: hautsDeSeineMessages_fr
}
