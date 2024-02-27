import { Department } from "../../../../country/region/department/Department"
import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { texas } from "../Texas"

export const tarrant = new Department(UsaDepartementCode.tarrant, texas, Place.fromDMS("32°46′N 97°17′W"))
