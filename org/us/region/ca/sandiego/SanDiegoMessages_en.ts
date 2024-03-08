import { oceansideMessages } from "./oceanside/OceansideMessages"
import { campPendletonMessages } from "./camppendleton/CampPendletonMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const sanDiegoMessages_en = DepartmentMessages.create(
  "San Diego County",
  {
    92058: oceansideMessages,
    "92058_base": campPendletonMessages
  }
)
