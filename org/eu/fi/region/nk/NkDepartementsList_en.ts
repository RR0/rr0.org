import { NkDepartementMessagesList } from "./NkDepartementMessagesList"
import { pkCityMessages_en } from "./pk/PkCityMessages_en"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const nkDepartementsList_en: NkDepartementMessagesList = {
  pk: new DepartmentMessages("Pielinen Karelia", pkCityMessages_en)
}
