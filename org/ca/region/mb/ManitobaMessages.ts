import { ManitobaDepartmentCode } from "./ManitobaDepartmentCode"
import { DepartmentMessages } from "../../../country/region/department/DepartmentMessages"

export type ManitobaMessages = { [key in ManitobaDepartmentCode]: DepartmentMessages }
