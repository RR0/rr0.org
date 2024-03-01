import { slocombMessages } from "./slocomb/SlocombMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { GenevaCityCode } from "./GenevaCityCode"

export const genevaMessages_en = new OrganizationMessages("Geneva County")
genevaMessages_en[OrganizationType.city] = {
  [GenevaCityCode.Slocomb]: slocombMessages
}
