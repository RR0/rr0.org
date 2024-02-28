import { GeipanCase, GeipanClassification } from "./GeipanCase"
import { geipanDatasource } from "./GeipanRR0Mapping"
import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"

export const geipanTestCases: GeipanCase[] = [
  {
    caseNumber: "1977-03-00399",
    url: new URL(
      "https://geipan.fr/fr/cas/1977-03-00399?fr/cas/1977-03-00399?customGetLattitude=46.124763699209396&customGetLongitude=2.4169921875000004&customGetZoom=6&field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmax%5D=50.52739681329302&field_latitude_value%5Bmin%5D=&field_latitude_value%5Bmin%5D=41.72213058512578&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmax%5D=7.492675781250001&field_longitude_value%5Bmin%5D=&field_longitude_value%5Bmin%5D=-2.65869140625&field_phenomene_target_id=&field_type_de_cas_target_id=All&page=0&select-category-export=nothing",
      geipanDatasource.baseUrl),
    city: "BELLEVILLE-SUR-SAONE",
    depCode: 71,
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1977, 3, 18),
    postTime: new TimeContext(rr0TestUtil.intlOptions, 2010, 8, 6),
    classification: GeipanClassification.MissingInfo
  },
  {
    caseNumber: "1977-10-00438",
    url: new URL(
      "https://geipan.fr/fr/cas/1977-10-00438?fr/cas/1977-10-00438?customGetLattitude=46.124763699209396&customGetLongitude=2.4169921875000004&customGetZoom=6&field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmax%5D=50.52739681329302&field_latitude_value%5Bmin%5D=&field_latitude_value%5Bmin%5D=41.72213058512578&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmax%5D=7.492675781250001&field_longitude_value%5Bmin%5D=&field_longitude_value%5Bmin%5D=-2.65869140625&field_phenomene_target_id=&field_type_de_cas_target_id=All&page=0&select-category-export=nothing",
      geipanDatasource.baseUrl),
    city: "ESTANG",
    depCode: 32,
    dateTime: new TimeContext(rr0TestUtil.intlOptions, 1977, 10, 8),
    postTime: new TimeContext(rr0TestUtil.intlOptions, 2011, 5, 18),
    classification: GeipanClassification.Identified
  }
]
