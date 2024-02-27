import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { oceansideMessages } from "./oceanside/OceansideMessages"
import { campPendletonMessages } from "./camppendleton/CampPendletonMessages"

export const sanDiegoMessages_en = new DepartmentMessages(
  "San Diego County",
  {
    92058: oceansideMessages,
    "92058_base": campPendletonMessages
  }
)
