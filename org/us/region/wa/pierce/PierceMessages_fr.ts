import { bonneyLakeMessages } from "./bonneylake/BonneyLakeMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { PierceCityCode } from "./PierceCityCode"

export const pierceMessages_fr = new OrganizationMessages("Comté de Pierce")
pierceMessages_fr[OrganizationType.city] = {
  [PierceCityCode.BonneyLake]: bonneyLakeMessages
}
