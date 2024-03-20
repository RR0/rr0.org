import { SeineMaritimeCityCode } from "./SeineMaritimeCityCode"
import { londeMessages } from "./Londe/LondeMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { crielSurMerMessages } from "./CrielSurMer/CrielSurMerMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { dieppeMessages } from "./Dieppe/DieppeMessages"

type SeineMaritimeCityMessagesList = { [key in SeineMaritimeCityCode]: CityMessages }
export const seineMaritimeMessages = new DepartmentMessages<SeineMaritimeCityMessagesList>(
  ["Seine-Maritime", "Seine-Inférieure"], {
    [SeineMaritimeCityCode.CrielSurMer]: crielSurMerMessages,
    [SeineMaritimeCityCode.Dieppe]: dieppeMessages,
    [SeineMaritimeCityCode.Londe]: londeMessages
  }
)
