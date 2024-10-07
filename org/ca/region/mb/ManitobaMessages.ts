import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode.js"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages.js"

export type ManitobaMessages = { [key in ManitobaDepartmentCode]: DepartmentMessages }
