import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { PacaDepartementCode } from "./PacaDepartementCode.js"
import { hautesAlpesMessages } from "./05/HautesAlpesMessages.js"
import { vaucluseMessages } from "./84/VaucluseMessages.js"
import { alpesMaritimesMessages } from "./06/AlpesMaritimesMessages.js"
import { varMessages } from "./83/VarMessages.js"
import { bouchesDuRhoneMessages } from "./13/BouchesDuRhoneMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { alpesDeHauteProvenceMessages } from "./04/AlpesDeHauteProvenceMessages.js"
import { vendeeMessages } from "./85/VendeeMessages.js"

type PacaDepartmentMessagesList = { [key in PacaDepartementCode]: DepartmentMessages<any> }
export const pacaMessages = RegionMessages.create<PacaDepartmentMessagesList>(
  "Provence-Alpes-Côte d'Azur", {
    [PacaDepartementCode.AlpesDeHauteProvence]: alpesDeHauteProvenceMessages,
    [PacaDepartementCode.AlpesMaritimes]: alpesMaritimesMessages,
    [PacaDepartementCode.BouchesDuRhone]: bouchesDuRhoneMessages,
    [PacaDepartementCode.HautesAlpes]: hautesAlpesMessages,
    [PacaDepartementCode.Vaucluse]: vaucluseMessages,
    [PacaDepartementCode.Var]: varMessages,
    [PacaDepartementCode.Vendee]: vendeeMessages
  }
)
