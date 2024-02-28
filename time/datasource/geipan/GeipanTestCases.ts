import { GeipanCase, GeipanClassification } from "./GeipanCase"
import { geipanDatasource } from "./GeipanRR0Mapping"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"

export const geipanTestCases: GeipanCase[] = [
  {
    depCode: 71,
    caseNumber: "1977-03-00399",
    url: new URL(
      "https://geipan.fr/fr/cas/1977-03-00399?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing",
      geipanDatasource.baseUrl),
    city: "BELLEVILLE-SUR-SAONE",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1977, 3, 18),
    postTime: new TimeContext(rr0TestUtil.intlOptions, 2010, 8, 6),
    classification: GeipanClassification.MissingInfo
  },
  {
    depCode: 32,
    caseNumber: "1977-10-00438",
    url: new URL(
      "https://geipan.fr/fr/cas/1977-10-00438?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing",
      geipanDatasource.baseUrl),
    city: "ESTANG",
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1977, 10, 8),
    postTime: new TimeContext(rr0TestUtil.intlOptions, 2011, 5, 18),
    classification: GeipanClassification.Identified
  }
]
