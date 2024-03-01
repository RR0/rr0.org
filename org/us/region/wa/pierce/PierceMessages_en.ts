import { bonneyLakeMessages } from "./bonneylake/BonneyLakeMessages"
import { PierceCityCode } from "./PierceCityCode"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const pierceMessages_en = new OrganizationMessages("Pierce County")
pierceMessages_en[OrganizationType.city] = {
  [PierceCityCode.BonneyLake]: bonneyLakeMessages
}
