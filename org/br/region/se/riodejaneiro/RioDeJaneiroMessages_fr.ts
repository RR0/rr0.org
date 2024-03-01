import { RioDeJaneiroCityCode } from "./RioDeJaneiroCityCode"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { rioDeJaneiroCityMessages } from "./20000-000/RioDeJaneiroCityMessages"

export let rioDeJaneiroMessages_fr = new OrganizationMessages("État de Rio de Janeiro")
rioDeJaneiroMessages_fr[OrganizationType.city] = {
  [RioDeJaneiroCityCode.RioDeJaneiro]: rioDeJaneiroCityMessages
}
