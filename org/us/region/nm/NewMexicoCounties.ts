import { Place } from "../../../../place/Place.js"
import { Department } from "../../../country/region/department/Department.js"
import { newMexico } from "./NewMexico.js"
import { NewMexicoDepartementCode } from "./NewMexicoDepartementCode.js"

export const newMexicoCounties: Department[] = [
  Department.create(NewMexicoDepartementCode.chaves, newMexico, Place.fromLocation(48, 0.316667))
]
