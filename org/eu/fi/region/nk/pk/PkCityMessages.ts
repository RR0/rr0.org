import { PkCityCode } from "./PkCityCode.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { LieskaMessages } from "./lieksa/LieskaMessages.js"

export type PkCityMessagesList = { [key in PkCityCode]: OrganizationMessages }
export const pkCityMessages: PkCityMessagesList = {
  [PkCityCode.Lieska]: LieskaMessages
}
