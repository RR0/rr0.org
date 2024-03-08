export enum GeipanCaseClassification {
  Identified = "A",
  LikelyIdentified = "B",

  /**
   * Missing reliable info.
   */
  MissingInfo = "C",

  Unidentified = "D",
  Unidentified1 = "D1",
  Unidentified2 = "D2",
}

export enum GeipanCaseClassification_minus {
  Identified_minus = "A-",
  LikelyIdentified_minus = "B-",
  MissingInfo = "C-",
  Unidentified = "D-",
  Unidentified1_minus = "D1-",
  Unidentified2 = "D2-",
}

export type GeipanCaseClassification_calc = GeipanCaseClassification & GeipanCaseClassification_minus
