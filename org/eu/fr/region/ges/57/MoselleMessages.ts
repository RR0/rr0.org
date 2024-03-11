import { MoselleCityCode } from "./MoselleCityCode"
import { arsSurMoselleMessages } from "./arssurmoselle/ArsSurMoselleMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const moselleMessages = DepartmentMessages.create("Moselle", {
  [MoselleCityCode.ArsSurMoselle]: arsSurMoselleMessages
})
