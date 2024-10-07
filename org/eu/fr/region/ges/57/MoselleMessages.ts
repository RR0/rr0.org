import { MoselleCityCode } from "./MoselleCityCode.js"
import { arsSurMoselleMessages } from "./ArsSurMoselle/ArsSurMoselleMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"
import { forbachMessages } from "./Forbach/ForbachMessages.js"
import { montignyLesMetzMessages } from "./MontignyLesMetz/MontignyLesMetzMessages.js"
import { bouzonvilleMessages } from "./Bouzonville/BouzonvilleMessages.js"

type DepMessages = { [key in MoselleCityCode]: CityMessages }
export const moselleMessages = DepartmentMessages.create<DepMessages>("Moselle", {
  [MoselleCityCode.ArsSurMoselle]: arsSurMoselleMessages,
  [MoselleCityCode.Bouzonville]: bouzonvilleMessages,
  [MoselleCityCode.Forbach]: forbachMessages,
  [MoselleCityCode.MontignyLesMetz]: montignyLesMetzMessages
})
