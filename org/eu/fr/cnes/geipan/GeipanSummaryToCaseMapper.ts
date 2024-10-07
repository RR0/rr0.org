import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { GeipanCase } from "./GeipanCase.js"
import { CaseMapper } from "../../../../../time/datasource/CaseMapper.js"
import { RR0SsgContext } from "../../../../../RR0SsgContext.js"

/**
 * Maps a GEIPAN CSV case to a GEIPAN summary case.
 */
export class GeipanSummaryToCaseMapper implements CaseMapper<RR0SsgContext, GeipanCaseSummary, GeipanCase> {

  constructor(readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: RR0SsgContext, csvCase: GeipanCaseSummary, sourceTime: Date): GeipanCase {
    const caseNumber = csvCase.id
    const sightingYear = csvCase.dateTime.getYear().toString()
    const sightingMonth = csvCase.dateTime.getMonth()?.toString() ?? "--"
    const sightingDayOfMonth = csvCase.dateTime.getDayOfMonth()?.toString() ?? "--"
    return {
      cas_classification: csvCase.classification,
      cas_consistance_calc: 0,
      cas_consistance_calc_err: 0,
      cas_etrangete_calc: 0,
      cas_etrangete_calc_err: 0,
      cas_public: true,
      cas_resume: "",
      cas_resume_web: "",
      cas_zone_nom: "",
      id_cas: 0,
      cas_numEtude: caseNumber,
      cas_nom_dossier: csvCase.city,
      cas_zone_type: csvCase.zoneType,
      cas_zone_code: csvCase.zoneCode,
      cas_AAAA: sightingYear,
      cas_MM: sightingMonth,
      cas_JJ: sightingDayOfMonth,
      cas_date_maj: csvCase.postTime.toString(),
      cas_classification_calc: csvCase.classification
    }
  }
}
