import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { rioDeJaneiroMessages } from "./20000-000/RioDeJaneiroMessages"

export let rioDeJaneiroMessages_en = new OrganizationMessages("State of Rio de Janeiro")
rioDeJaneiroMessages_en[OrganizationType.city] = {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroMessages
}
