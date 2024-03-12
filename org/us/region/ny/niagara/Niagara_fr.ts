import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { NiagaraCityCode } from "./NiagaraCityCode"
import { niagaraFallsMessages } from "./niagarafalls/NiagaraFallsMessages"

export const niagara_fr = DepartmentMessages.create("Comté de Niagara", {
    [NiagaraCityCode.NiagaraFalls]: niagaraFallsMessages
  }
)
