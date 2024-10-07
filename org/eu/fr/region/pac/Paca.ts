import { franceRegion } from "../FranceRegion.js"
import { FranceRegionCode } from "../FranceRegionCode.js"
import { Place } from "../../../../../place/Place.js"

export let paca = franceRegion(FranceRegionCode.pac, Place.fromLocation(44, 6))
