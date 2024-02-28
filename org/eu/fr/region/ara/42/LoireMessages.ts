import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { LoireCityMessagesList } from "./LoireCityMessagesList"
import { stEtienne42Messages } from "./stetienne/StEtienneMessages"

export const loireCityMessages: LoireCityMessagesList = {
  "42218": stEtienne42Messages
}

export const loireMessages = new DepartmentMessages<LoireCityMessagesList>("Loire", loireCityMessages)
