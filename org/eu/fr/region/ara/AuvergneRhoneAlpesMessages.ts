import { auvergneRhoneAlpesDepartementsMessageList } from "./AuvergneRhoneAlpesDepartementsMessageList"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const auvergneRhoneAlpesMessages = new OrganizationMessages("Pays-de-la-Loire")
auvergneRhoneAlpesMessages[OrganizationType.department] = auvergneRhoneAlpesDepartementsMessageList
