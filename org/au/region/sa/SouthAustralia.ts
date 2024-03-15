import { australiaRegion } from "../AustraliaRegion"
import { AustraliaRegionCode } from "../AustraliaRegionCode"
import { Place } from "../../../../place/Place"

export let southAustralia = australiaRegion(AustraliaRegionCode.sa, Place.fromDMS("30°0'S 135°0'E"))
