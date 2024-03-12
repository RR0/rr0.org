import { caDepartment } from "../CaDepartment"
import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"

export const sanDiego = caDepartment(UsaCountyCode.sandiego, Place.fromLocation(48, 0.316667))
