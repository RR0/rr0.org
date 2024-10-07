import { oceansideMessages } from "./oceanside/OceansideMessages.js"
import { campPendletonMessages } from "./camppendleton/CampPendletonMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const sanDiegoMessages_fr = DepartmentMessages.create(
  "Comté de San Diego",
  {
    92058: oceansideMessages,
    "92058_base": campPendletonMessages
  }
)
