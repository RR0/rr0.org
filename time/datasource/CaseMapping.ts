import { Datasource } from "./Datasource"
import { CaseMapper } from "./CaseMapper"
import { RR0UfoCase } from "./RR0UfoCase"

export interface CaseMapping<C, S extends RR0UfoCase, T> {
  datasource: Datasource<S>
  mapper: CaseMapper<C, S, T>
}
