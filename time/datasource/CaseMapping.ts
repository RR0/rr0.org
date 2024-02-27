import { CaseSource } from "./CaseSource"
import { CaseMapper } from "./CaseMapper"

export interface CaseMapping<C, S, T> {
  datasource: CaseSource<S>
  mapper: CaseMapper<C, S, T>
}
