import { SeineMaritimeCityCode } from "./SeineMaritimeCityCode"
import { londeMessages } from "./Londe/LondeMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { crielSurMerMessages } from "./CrielSurMer/CrielSurMerMessages"

type SeineMaritimeCityMessagesList = { [key in SeineMaritimeCityCode]: OrganizationMessages }
export const seineMaritimeMessages = new DepartmentMessages<SeineMaritimeCityMessagesList>(
  ["Seine-Maritime", "Seine-Inférieure"], {
    [SeineMaritimeCityCode.CrielSurMer]: crielSurMerMessages,
    [SeineMaritimeCityCode.Londe]: londeMessages
  }
)
