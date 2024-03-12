import { usaRegion } from "../../Usa"
import { UsaRegionCode } from "../UsaRegionCode"
import { Place } from "../../../../place/Place"

export const newYork = usaRegion(UsaRegionCode.ny, Place.fromDMS("43°0'N,75°0'W"))
