import { SeineMaritimeCityCode } from "./SeineMaritimeCityCode"
import { londeMessages } from "./londe/LondeMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

type SeineMaritimeCityMessagesList = { [key in SeineMaritimeCityCode]: OrganizationMessages }
const seineMaritimeCityMessages: SeineMaritimeCityMessagesList = {
  [SeineMaritimeCityCode.Londe]: londeMessages
}
export const seineMaritimeMessages = new DepartmentMessages<SeineMaritimeCityMessagesList>(
  ["Seine-Maritime", "Seine-Inférieure"],
  seineMaritimeCityMessages
)
