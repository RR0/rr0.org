import { slocombMessages } from "./slocomb/SlocombMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { GenevaCityCode } from "./GenevaCityCode"

export const genevaMessages_fr = new OrganizationMessages("Comté de Geneva")
genevaMessages_fr[OrganizationType.city] = {
  [GenevaCityCode.Slocomb]: slocombMessages
}
