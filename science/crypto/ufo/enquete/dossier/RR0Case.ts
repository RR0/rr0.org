import { RR0CaseSummary } from "../../../../../time/datasource/rr0/RR0CaseSummary"


enum HynekClassification {
  NL = "NL",
  DD = "DD",
  RV = "RV",
  CE1 = "CE1",
  CE2 = "CE2",
  CE3 = "CE3",
  CE4 = "CE3",
  CE5 = "CE3"
}

enum CaseConclusion {
  unknown = "unknown",
  misinterpretation = "misinterpretation",
  hoax = "hoax"
}

export interface RR0Case extends RR0CaseSummary {
  title: string
  time: string
  classification?: {
    hynek: HynekClassification
  },
  conclusion?: CaseConclusion
}
