import { sainsRichaumontMessages } from "./SainsRichaumont/SainsRichaumontMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { AisneCityCode } from "./AisneCityCode"

type AisneCityMessagesList = { [key in AisneCityCode]: CityMessages }
const aisneCityMessages: AisneCityMessagesList = {
  [AisneCityCode.SainsRichaumont]: sainsRichaumontMessages
}
export const aisneMessages = DepartmentMessages.create<AisneCityMessagesList>("Aisne", aisneCityMessages)
