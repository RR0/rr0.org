import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { LoireAtlantiqueCityCode } from "./LoireAtlantiqueCityCode"
import { leCroisicMessages } from "./LeCroisic/LeCroisicMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { lorouxBottereauMessages } from "./LorouxBottereau/LorouxBottereauMessages"
import { rezeMessages } from "./Reze/RezeMessages"

type LoireAtlantiqueCityMessagesList = { [key in LoireAtlantiqueCityCode]: CityMessages }
export const loireAtlantiqueMessages = DepartmentMessages.create<LoireAtlantiqueCityMessagesList>("Loire-Atlantique",
  {
    [LoireAtlantiqueCityCode.LeCroisic]: leCroisicMessages,
    [LoireAtlantiqueCityCode.LorouxBottereau]: lorouxBottereauMessages,
    [LoireAtlantiqueCityCode.Reze]: rezeMessages
  })
