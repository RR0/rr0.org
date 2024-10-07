import { canadaRegion } from "../CanadaRegion.js"
import { CanadaRegionCode } from "../CanadaRegionCode.js"
import { Place } from "../../../../place/Place.js"

export let quebec = canadaRegion(CanadaRegionCode.qc, Place.fromLocation(47.466667, 0.833333))
