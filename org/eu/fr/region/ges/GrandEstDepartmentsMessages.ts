import { GrandEstDepartementCode } from "./GrandEstDepartementCode.js"
import { meurtheEtMoselleMessages } from "./54/MeurtheEtMoselleMessages.js"
import { marneMessages } from "./51/MarneMessages.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { meuseMessages } from "./55/MeuseMessages.js"
import { basRhinMessages } from "./67/BasRhinMessages.js"
import { moselleMessages } from "./57/MoselleMessages.js"
import { vosgesMessages } from "./88/VosgesMessages.js"
import { ardennesMessages } from "./08/ArdennesMessages.js"
import { hautRhinMessages } from "./68/HautRhinMessages.js"

type OccitanieDepartmentMessagesList = { [key in GrandEstDepartementCode]: OrganizationMessages }
export const grandEstDepartmentsMessages: OccitanieDepartmentMessagesList = {
  [GrandEstDepartementCode.Ardennes]: ardennesMessages,
  [GrandEstDepartementCode.BasRhin]: basRhinMessages,
  [GrandEstDepartementCode.HautRhin]: hautRhinMessages,
  [GrandEstDepartementCode.Marne]: marneMessages,
  [GrandEstDepartementCode.MeurtheEtMoselle]: meurtheEtMoselleMessages,
  [GrandEstDepartementCode.Meuse]: meuseMessages,
  [GrandEstDepartementCode.Moselle]: moselleMessages,
  [GrandEstDepartementCode.Vosges]: vosgesMessages
}
