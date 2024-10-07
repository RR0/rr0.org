import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { LoireAtlantiqueCityCode } from "./LoireAtlantiqueCityCode.js"
import { leCroisicMessages } from "./LeCroisic/LeCroisicMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { lorouxBottereauMessages } from "./LorouxBottereau/LorouxBottereauMessages.js"
import { rezeMessages } from "./Reze/RezeMessages.js"

type LoireAtlantiqueCityMessagesList = { [key in LoireAtlantiqueCityCode]: CityMessages }
export const loireAtlantiqueMessages = DepartmentMessages.create<LoireAtlantiqueCityMessagesList>("Loire-Atlantique",
  {
    [LoireAtlantiqueCityCode.LeCroisic]: leCroisicMessages,
    [LoireAtlantiqueCityCode.LorouxBottereau]: lorouxBottereauMessages,
    [LoireAtlantiqueCityCode.Reze]: rezeMessages
  })
