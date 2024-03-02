import { GrandEstDepartementCode } from "./GrandEstDepartementCode"
import { meurtheEtMoselleMessages } from "./54/MeurtheEtMoselleMessages"
import { marneMessages } from "./51/MarneMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"

export type OccitanieDepartmentMessagesList = { [key in GrandEstDepartementCode]: OrganizationMessages }

export const grandEstDepartmentsMessages: OccitanieDepartmentMessagesList = {
  [GrandEstDepartementCode.Marne]: marneMessages,
  [GrandEstDepartementCode.MeurtheEtMoselle]: meurtheEtMoselleMessages
}
