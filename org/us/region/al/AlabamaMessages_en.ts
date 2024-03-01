import { genevaMessages_en } from "./geneva/GenevaMessages_en"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const alabamaMessages_en = new OrganizationMessages("Alabama")
alabamaMessages_en[OrganizationType.department] = {
  geneva: genevaMessages_en
}
