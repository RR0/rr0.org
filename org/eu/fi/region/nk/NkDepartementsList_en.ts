import { NkDepartementMessagesList } from "./NkDepartementMessagesList"
import { pkCityMessages } from "./pk/PkCityMessages"
import { DepartmentMessages } from "../../../../country/region/department/city/DepartmentMessages"

export const nkDepartementsList_en: NkDepartementMessagesList = {
  pk: DepartmentMessages.create("Pielinen Karelia", pkCityMessages)
}
