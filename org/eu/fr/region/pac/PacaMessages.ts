import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PacaDepartementCode } from "./PacaDepartementCode"
import { hautesAlpesMessages } from "./05/HautesAlpesMessages"
import { vaucluseMessages } from "./84/VaucluseMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { alpesMaritimesMessages } from "./06/HautesAlpesMessages"
import { varMessages } from "./83/VarMessages"
import { bouchesDuRhoneMessages } from "./13/BouchesDuRhoneMessages"

export type PacaDepartmentMessagesList = { [key in PacaDepartementCode]: DepartmentMessages }

export const pacaMessageList: PacaDepartmentMessagesList = {
  [PacaDepartementCode.AlpesMaritimes]: alpesMaritimesMessages,
  [PacaDepartementCode.BouchesDuRhone]: bouchesDuRhoneMessages,
  [PacaDepartementCode.HautesAlpes]: hautesAlpesMessages,
  [PacaDepartementCode.Vaucluse]: vaucluseMessages,
  [PacaDepartementCode.Var]: varMessages
}

export const pacaMessages = new RegionMessages<PacaDepartmentMessagesList>(
  "Provence-Alpes-Côte d'Azur", pacaMessageList
)
