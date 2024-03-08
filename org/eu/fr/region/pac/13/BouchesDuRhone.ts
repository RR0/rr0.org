import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export let bouchesDuRhone = Department.create(PacaDepartementCode.BouchesDuRhone, paca, Place.fromDMS("43°30′N,5°10′E"))
