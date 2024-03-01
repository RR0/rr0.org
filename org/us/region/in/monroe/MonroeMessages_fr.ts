import { bloomingtonMessages } from "./bloomington/BloomingtonMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { MonroeCityCode } from "./MonroeCityCode"

export const monroeMessages_fr = new OrganizationMessages("Comté de Monroe")
monroeMessages_fr[OrganizationType.city] = {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
}
