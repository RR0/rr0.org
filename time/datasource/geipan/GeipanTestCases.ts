import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { geipanHttpDatasource } from "./GeipanRR0Mapping"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { GeipanCaseClassification } from "./GeipanCaseClassification"

export const geipanTestCaseSummaries: GeipanCaseSummary[] = [
  {
    caseNumber: "1951-08-00003",
    url: new URL(
      "https://geipan.fr/fr/cas/1951-08-00003?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing1951-08-00003",
      geipanHttpDatasource.baseUrl),
    city: "BIARRITZ",
    depCode: "64",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1951, 8),
    postTime: new TimeContext(rr0TestUtil.intlOptions, 2016, 12, 19),
    classification: GeipanCaseClassification.MissingInfo
  },
  {
    caseNumber: "1952-06-00004",
    url: new URL(
      "https://geipan.fr/fr/cas/1952-06-00004?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing1952-06-00004",
      geipanHttpDatasource.baseUrl),
    city: "PORT-GENTIL",
    depCode: "8",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1952, 6, 1),
    postTime: new TimeContext(rr0TestUtil.intlOptions, 2015, 3, 27),
    classification: GeipanCaseClassification.Unidentified1
  }
]
