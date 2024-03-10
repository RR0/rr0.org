import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { LoireAtlantiqueCityCode } from "./LoireAtlantiqueCityCode"
import { leCroisicMessages } from "./lecroisic/LeCroisicMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { lorouxBottereauMessages } from "./lorouxbottereau/LorouxBottereauMessages"

type LoireAtlantiqueCityMessagesList = { [key in LoireAtlantiqueCityCode]: CityMessages }
const loireAtlantiqueCityMessages: LoireAtlantiqueCityMessagesList = {
  [LoireAtlantiqueCityCode.LeCroisic]: leCroisicMessages,
  [LoireAtlantiqueCityCode.LorouxBottereau]: lorouxBottereauMessages
}
export const loireAtlantiqueMessages = DepartmentMessages.create<LoireAtlantiqueCityMessagesList>("Loire-Atlantique",
  loireAtlantiqueCityMessages)
