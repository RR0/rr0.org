import { bloomingtonMessages } from "./bloomington/BloomingtonMessages"
import { MonroeCityCode } from "./MonroeCityCode"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const monroeMessages_en = new OrganizationMessages("Monroe County")
monroeMessages_en[OrganizationType.city] = {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
}
