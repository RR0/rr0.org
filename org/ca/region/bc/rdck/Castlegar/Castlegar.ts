import { Place } from "../../../../../../place/Place"
import { kootenays } from "../Kootenays"
import { City } from "../../../../../country/region/department/city/City"
import { KootenaysCityCode } from "../KootenaysCityCode"

export const castlegar = City.create(KootenaysCityCode.Castegar, kootenays, Place.fromDMS("49°19′28″N 117°40′01″W"))
