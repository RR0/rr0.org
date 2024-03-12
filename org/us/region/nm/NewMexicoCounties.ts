import { Place } from "../../../../place/Place"
import { Department } from "../../../country/region/department/Department"
import { newMexico } from "./NewMexico"
import { NewMexicoDepartementCode } from "./NewMexicoDepartementCode"

export const newMexicoCounties: Department[] = [
  Department.create(NewMexicoDepartementCode.chaves, newMexico, Place.fromLocation(48, 0.316667))
]
