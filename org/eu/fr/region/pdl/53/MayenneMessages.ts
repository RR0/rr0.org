import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { MayenneCityCode } from "./MayenneCityCode.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { chateauGontierMessages } from "./ChateauGontier/ChateauGontierMessages.js"

type DepMessages = { [key in MayenneCityCode]: CityMessages }
export const mayenneMessages = DepartmentMessages.create<DepMessages>("Mayenne", {
  [MayenneCityCode.ChateauGontier]: chateauGontierMessages
})
