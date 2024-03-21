import { PkCityCode } from "./PkCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { LieskaMessages } from "./lieksa/LieskaMessages"

export type PkCityMessagesList = { [key in PkCityCode]: OrganizationMessages }
export const pkCityMessages: PkCityMessagesList = {
  [PkCityCode.Lieska]: LieskaMessages
}
