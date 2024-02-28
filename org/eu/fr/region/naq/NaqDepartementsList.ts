import { NaqDepartmentMessagesList } from "./NaqDepartmentMessagesList"
import { creuseCityMessages_fr } from "./23/CreuseCityMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { charenteCityMessages_fr } from "./16/CharenteCityMessages_fr"

export const naqDepartementsList: NaqDepartmentMessagesList = {
  16: new DepartmentMessages("Charente", charenteCityMessages_fr),
  23: new DepartmentMessages("Creuse", creuseCityMessages_fr)
}
