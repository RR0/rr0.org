import { GrandEstDepartementCode } from "./GrandEstDepartementCode"
import { meurtheEtMoselleMessages } from "./54/MeurtheEtMoselleMessages"
import { marneMessages } from "./51/MarneMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { meuseMessages } from "./55/MeuseMessages"
import { basRhinMessages } from "./67/BasRhinMessages"
import { moselleMessages } from "./57/MoselleMessages"
import { vosgesMessages } from "./88/VosgesMessages"
import { ardennesMessages } from "./08/ArdennesMessages"
import { hautRhinMessages } from "./68/HautRhinMessages"

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
