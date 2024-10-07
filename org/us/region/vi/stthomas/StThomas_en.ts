import { StThomasCityCode } from "./StThomasCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { charlotteAmalie_en } from "./CharlotteAmalie/CharlotteAmalie_en.js"

export const stThomas_en = DepartmentMessages.create("Saint Thomas", {
  [StThomasCityCode.CharlotteAmalie]: charlotteAmalie_en
})
