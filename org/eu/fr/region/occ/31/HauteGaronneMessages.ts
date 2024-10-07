import { HauteGaronneCityCode } from "./HauteGaronneCityCode.js"
import { loudetMessages } from "./loudet/LoudetMessages.js"
import { stPlancardMessages } from "./stplancard/StPlancardMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { toulouseMessages } from "./toulouse/ToulouseMessages.js"

type HauteGaronneCityMessages = { [key in HauteGaronneCityCode]: OrganizationMessages }
const hauteGaronneCityMessages: HauteGaronneCityMessages = {
  [HauteGaronneCityCode.Loudet]: loudetMessages,
  [HauteGaronneCityCode.StPlancard]: stPlancardMessages,
  [HauteGaronneCityCode.Toulouse]: toulouseMessages
}
export const hauteGaronneMessages = DepartmentMessages.create<HauteGaronneCityMessages>("Haute-Garonne",
  hauteGaronneCityMessages)
