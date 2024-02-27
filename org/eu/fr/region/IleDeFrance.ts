import { FranceRegionCode } from "./FranceRegionCode"
import { Place } from "../../../../place/Place"
import { franceRegion } from "./FranceRegion"
import { ileDeFrance } from "./idf/Idf"
import { paysDeLoire } from "./pdl/PaysDeLoire"

export const franceRegions = {
  ara: franceRegion(FranceRegionCode.ara, Place.fromLocation(45.833333, 4.666667)),
  ileDeFrance,
  naq: franceRegion(FranceRegionCode.naq, Place.fromLocation(44.836667, 0.588889)),
  normandie: franceRegion(FranceRegionCode.nor, Place.fromLocation(49.186389, 0.352778)),
  paca: franceRegion(FranceRegionCode.pac, Place.fromLocation(44, 6)),
  paysDeLoire
}
