import { CaseSource } from "./CaseSource"
import { CaseMapper } from "./CaseMapper"
import { UfoCase } from "./UfoCase"

export interface CaseMapping<C, S extends UfoCase, T> {
  datasource: CaseSource<S>
  mapper: CaseMapper<C, S, T>
}
