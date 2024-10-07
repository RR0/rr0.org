import { Datasource } from "./Datasource.js"
import { CaseMapper } from "./CaseMapper.js"
import { FileDatasource } from "./FileDatasource.js"

import { ChronologyReplacerActions } from "./ChronologyReplacerActions.js"

/**
 * @param C The context type to use.
 * @param S The source case type (FuforaCaseSummary for instance).
 * @param T The target case type (RR0CaseSummary for instance).
 */
export interface CaseMapping<C, S, T> {
  /**
   * The source to fetch cases from.
   *
   * @param S The source case type.
   */
  readonly datasource: Datasource<S>

  /**
   * The source to read/write cases from (for backup).
   *
   * @param S The source case type.
   */
  readonly backupDatasource?: FileDatasource<S>

  /**
   * Maps source case to target case.
   *
   * @param C The context type
   * @param S The source case type
   * @param T The target case type
   */
  readonly mapper: CaseMapper<C, S, T>

  readonly actions: ChronologyReplacerActions
}
