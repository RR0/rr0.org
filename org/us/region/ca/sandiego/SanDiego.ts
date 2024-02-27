import { caDepartment } from "../CaDepartment"
import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"

export const sanDiego = caDepartment(UsaDepartementCode.sandiego, Place.fromLocation(48, 0.316667))
