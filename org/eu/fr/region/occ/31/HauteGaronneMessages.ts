import { HauteGaronneCityCode } from "./HauteGaronneCityCode"
import { loudetMessages } from "./loudet/LoudetMessages"
import { stPlancardMessages } from "./stplancard/StPlancardMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { toulouseMessages } from "./toulouse/ToulouseMessages"

type HauteGaronneCityMessages = { [key in HauteGaronneCityCode]: OrganizationMessages }
const hauteGaronneCityMessages: HauteGaronneCityMessages = {
  [HauteGaronneCityCode.Loudet]: loudetMessages,
  [HauteGaronneCityCode.StPlancard]: stPlancardMessages,
  [HauteGaronneCityCode.Toulouse]: toulouseMessages
}
export const hauteGaronneMessages = DepartmentMessages.create<HauteGaronneCityMessages>("Haute-Garonne",
  hauteGaronneCityMessages)
