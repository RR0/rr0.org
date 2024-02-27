import { Place } from "../../../../place/Place"
import { usaRegions } from "../UsaRegions"
import { UsaDepartementCode } from "../UsaDepartementCode"
import { Department } from "../../../country/region/department/Department"

export const nmDepartments = {
  Chaves: new Department(UsaDepartementCode.chaves, usaRegions.NewMexico, Place.fromLocation(48, 0.316667))
}
