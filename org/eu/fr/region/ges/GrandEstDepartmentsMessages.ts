import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { GrandEstDepartementCode } from "./GrandEstDepartementCode"
import { meurtheEtMoselleMessages } from "./54/MeurtheEtMoselleMessages"

export type OccitanieDepartmentMessagesList = { [key in GrandEstDepartementCode]: DepartmentMessages }

export const grandEstDepartmentsMessages: OccitanieDepartmentMessagesList = {
  [GrandEstDepartementCode.MeurtheEtMoselle]: meurtheEtMoselleMessages
}
