import { genevaMessages_fr } from "./geneva/GenevaMessages_fr"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const alabamaMessages_fr = new OrganizationMessages("Alabama")
alabamaMessages_fr[OrganizationType.department] = {
  geneva: genevaMessages_fr
}
