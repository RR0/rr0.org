import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PacaDepartementCode } from "./PacaDepartementCode"
import { hautesAlpesMessages } from "./05/HautesAlpesMessages"
import { vaucluseMessages } from "./84/VaucluseMessages"
import { alpesMaritimesMessages } from "./06/AlpesMaritimesMessages"
import { varMessages } from "./83/VarMessages"
import { bouchesDuRhoneMessages } from "./13/BouchesDuRhoneMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { alpesDeHauteProvenceMessages } from "./04/AlpesDeHauteProvenceMessages"

type PacaDepartmentMessagesList = { [key in PacaDepartementCode]: DepartmentMessages<any> }
const pacaMessageList: PacaDepartmentMessagesList = {
  [PacaDepartementCode.AlpesDeHauteProvence]: alpesDeHauteProvenceMessages,
  [PacaDepartementCode.AlpesMaritimes]: alpesMaritimesMessages,
  [PacaDepartementCode.BouchesDuRhone]: bouchesDuRhoneMessages,
  [PacaDepartementCode.HautesAlpes]: hautesAlpesMessages,
  [PacaDepartementCode.Vaucluse]: vaucluseMessages,
  [PacaDepartementCode.Var]: varMessages
}
export const pacaMessages = RegionMessages.create<PacaDepartmentMessagesList>(
  "Provence-Alpes-Côte d'Azur", pacaMessageList
)
