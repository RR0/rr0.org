import { PdlDepartmentMessagesList } from "./PdlDepartmentMessagesList"
import { sartheCityMessages_fr } from "./72/SartheCityMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const pdlDepartementsList: PdlDepartmentMessagesList = {
  72: new DepartmentMessages("Sarthe", sartheCityMessages_fr)
}
