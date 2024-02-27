import { canadaRegion } from "../CanadaRegion"
import { CanadaRegionCode } from "../CanadaRegionCode"
import { Place } from "../../../../place/Place"

export let britishColumbia = canadaRegion(CanadaRegionCode.bc, Place.fromLocation(47.466667, 0.833333))
