import { Place } from "../../../../../place/Place"
import { sanDiegoCity } from "./SanDiegoCity"
import { oceanSide } from "./OceanSide"

export const sandiegoCities = {
  oceanSide,
  CampPendleton: sanDiegoCity("92058_1", Place.fromDMS("33° 12′ 42″ N, 117° 19′ 33″ O"))
}
