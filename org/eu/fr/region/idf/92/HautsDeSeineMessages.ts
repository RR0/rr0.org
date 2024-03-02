import { HautsDeSeineCityCode } from "./HautsDeSeineCityCode"
import { nanterreMessages } from "./nanterre/NanterreMessages"
import { DepartmentMessages } from "../../../../../country/region/department/city/DepartmentMessages"

type HautDeSeineCityMessagesList = { [key in HautsDeSeineCityCode]: OrganizationMessages }

export const hautsDeSeineCityMessages: HautDeSeineCityMessagesList = {
  [HautsDeSeineCityCode.Nanterre]: nanterreMessages
}

export const hautsDeSeineMessages = new DepartmentMessages<HautDeSeineCityMessagesList>("Hauts-de-Seine",
  hautsDeSeineCityMessages)
