/**
 * Maps a case type to another type.
 *
 * @param C The context type to use.
 * @param S The source case type (FuforaCaseSummary for instance).
 * @param T The target case type (RR0CaseSummary for instance).
 */
export interface CaseMapper<C, S, T> {
  /**
   * Transform a native case into a target format.
   *
   * @param context
   * @param sourceCase the native source case.
   * @param sourceTime The date of source case publication.
   * @return the case in normalized format
   */
  map(context: C, sourceCase: S, sourceTime: Date): T
}
