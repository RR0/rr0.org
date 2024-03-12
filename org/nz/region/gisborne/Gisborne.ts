import { Place } from "place/Place"
import { NewZealandRegionCode } from "../NewZealandRegionCode"
import { newZealandRegion } from "../../NewZealand"

export const gisborneRegion = newZealandRegion(NewZealandRegionCode.gis, Place.fromDMS("38°40′00″S,178°01′00″E"))
