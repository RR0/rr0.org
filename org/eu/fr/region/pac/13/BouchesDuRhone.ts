import { Department } from "../../../../../country/region/department/Department"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"

export let bouchesDuRhone = new Department(PacaDepartementCode.BouchesDuRhone, paca, Place.fromDMS("43°30′N,5°10′E"))
