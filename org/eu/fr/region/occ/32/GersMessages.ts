import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { GersCityMessagesList } from "./GersCityMessagesList"
import { GersCityCode } from "./GersCityCode"
import { estang33Messages } from "./estang/EstangMessages"

export const gersCityMessages: GersCityMessagesList = {
  [GersCityCode.Estang]: estang33Messages
}

export const gersMessages = new DepartmentMessages<GersCityMessagesList>("Gers", gersCityMessages)
