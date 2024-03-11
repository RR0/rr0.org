import { GrandEstDepartementCode } from "./GrandEstDepartementCode"
import { meurtheEtMoselleMessages } from "./54/MeurtheEtMoselleMessages"
import { marneMessages } from "./51/MarneMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { meuseMessages } from "./55/MeuseMessages"
import { basRhinMessages } from "./67/BasRhinMessages"
import { moselleMessages } from "./57/MoselleMessages"

export type OccitanieDepartmentMessagesList = { [key in GrandEstDepartementCode]: OrganizationMessages }

export const grandEstDepartmentsMessages: OccitanieDepartmentMessagesList = {
  [GrandEstDepartementCode.BasRhin]: basRhinMessages,
  [GrandEstDepartementCode.Marne]: marneMessages,
  [GrandEstDepartementCode.MeurtheEtMoselle]: meurtheEtMoselleMessages,
  [GrandEstDepartementCode.Meuse]: meuseMessages,
  [GrandEstDepartementCode.Moselle]: moselleMessages
}
