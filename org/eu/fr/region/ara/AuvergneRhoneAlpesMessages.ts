import { auvergneRhoneAlpesDepartementsMessageList } from "./AuvergneRhoneAlpesDepartementsMessageList"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const auvergneRhoneAlpesMessages = new OrganizationMessages("Auvergne-Rhône-Alpes")
auvergneRhoneAlpesMessages[OrganizationType.department] = auvergneRhoneAlpesDepartementsMessageList
