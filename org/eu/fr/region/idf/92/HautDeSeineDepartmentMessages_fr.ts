import { HautDeSeineCityMessagesList } from "../IdfDepartementMessages_fr"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { hautDeSeineCityMessages_fr } from "./HautDeSeineCityMessages_fr"

export const hautDeSeineDepartmentMessages_fr = new DepartmentMessages<HautDeSeineCityMessagesList>(
  "Hauts-de-Seine",
  hautDeSeineCityMessages_fr
)
