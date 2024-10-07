import { Place } from "../../../../../../place/Place.js"
import { kootenays } from "../Kootenays.js"
import { City } from "../../../../../country/region/department/city/City.js"
import { KootenaysCityCode } from "../KootenaysCityCode.js"

export const castlegar = City.create(KootenaysCityCode.Castegar, kootenays, Place.fromDMS("49°19′28″N 117°40′01″W"))
