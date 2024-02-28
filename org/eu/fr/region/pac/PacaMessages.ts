import { RegionMessages } from "../../../../country/region/RegionMessages"
import { PacaDepartementCode } from "./PacaDepartementCode"
import { hautesAlpesMessages } from "./05/HautesAlpesMessages"
import { vaucluseMessages } from "./84/VaucluseMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export type PacaDepartmentMessagesList = { [key in PacaDepartementCode]: DepartmentMessages }

export const pacaMessageList: PacaDepartmentMessagesList = {
  [PacaDepartementCode.HautesAlpes]: hautesAlpesMessages,
  [PacaDepartementCode.Vaucluse]: vaucluseMessages
}

export const pacaMessages = new RegionMessages<PacaDepartmentMessagesList>(
  "Provence-Alpes-Côte d'Azur", pacaMessageList
)
