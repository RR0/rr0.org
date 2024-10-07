import { TarnEtGaronneCityCode } from "./TarnEtGaronneCityCode.js"
import { touffaillesMessages } from "./touffailles/TouffaillesMessages.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"

const tarnEtGaronneCityMessages: { [key in TarnEtGaronneCityCode]: OrganizationMessages } = {
  [TarnEtGaronneCityCode.Touffailles]: touffaillesMessages
}

export const tarnEtGaronneMessages = DepartmentMessages.create("Tarn-et-Garonne", tarnEtGaronneCityMessages)
