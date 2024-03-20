import { MoselleCityCode } from "./MoselleCityCode"
import { arsSurMoselleMessages } from "./ArsSurMoselle/ArsSurMoselleMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"
import { forbachMessages } from "./Forbach/ForbachMessages"
import { montignyLesMetzMessages } from "./MontignyLesMetz/MontignyLesMetzMessages"
import { bouzonvilleMessages } from "./Bouzonville/BouzonvilleMessages"

type DepMessages = { [key in MoselleCityCode]: CityMessages }
export const moselleMessages = DepartmentMessages.create<DepMessages>("Moselle", {
  [MoselleCityCode.ArsSurMoselle]: arsSurMoselleMessages,
  [MoselleCityCode.Bouzonville]: bouzonvilleMessages,
  [MoselleCityCode.Forbach]: forbachMessages,
  [MoselleCityCode.MontignyLesMetz]: montignyLesMetzMessages
})
