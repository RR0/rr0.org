import { Place } from "../../../../place/Place"
import { UsaDepartementCode } from "../UsaDepartementCode"
import { Department } from "../../../country/region/department/Department"
import { newMexico } from "./NewMexico"

export const newMexicoDepartments: Department[] = [
  Department.create(UsaDepartementCode.chaves, newMexico, Place.fromLocation(48, 0.316667))
]
