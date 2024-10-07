import { caDepartment } from "../CaDepartment.js"
import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"

export const sanDiego = caDepartment(UsaCountyCode.sandiego, Place.fromLocation(48, 0.316667))
