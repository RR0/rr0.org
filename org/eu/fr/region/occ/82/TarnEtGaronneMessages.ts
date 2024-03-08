import { TarnEtGaronneCityCode } from "./TarnEtGaronneCityCode"
import { touffaillesMessages } from "./touffailles/TouffaillesMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"

const tarnEtGaronneCityMessages: { [key in TarnEtGaronneCityCode]: OrganizationMessages } = {
  [TarnEtGaronneCityCode.Touffailles]: touffaillesMessages
}

export const tarnEtGaronneMessages = DepartmentMessages.create("Tarn-et-Garonne", tarnEtGaronneCityMessages)
