import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../Organization.js"
import { rioDeJaneiroMessages } from "./20000-000/RioDeJaneiroMessages.js"

export let rioDeJaneiroMessages_en = new OrganizationMessages("State of Rio de Janeiro")
rioDeJaneiroMessages_en[OrganizationType.city] = {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroMessages
}
