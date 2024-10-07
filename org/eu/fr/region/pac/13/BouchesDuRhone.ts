import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export let bouchesDuRhone = Department.create(PacaDepartementCode.BouchesDuRhone, paca, Place.fromDMS("43°30′N,5°10′E"))
