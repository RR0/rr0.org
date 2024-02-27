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
