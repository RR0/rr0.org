import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { NiagaraCityCode } from "./NiagaraCityCode"
import { niagaraFallsMessages } from "./niagarafalls/NiagaraFallsMessages"

export const niagara_en = DepartmentMessages.create("Niagara County", {
    [NiagaraCityCode.NiagaraFalls]: niagaraFallsMessages
  }
)
