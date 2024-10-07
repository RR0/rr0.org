import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../Organization.js"
import { rioDeJaneiroMessages } from "./20000-000/RioDeJaneiroMessages.js"

export let rioDeJaneiroMessages_fr = new OrganizationMessages("État de Rio de Janeiro")
rioDeJaneiroMessages_fr[OrganizationType.city] = {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroMessages
}
