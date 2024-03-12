import { Place } from "place/Place"
import { UsaRegionCode } from "../UsaRegionCode"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const virginia = usaRegion(UsaRegionCode.va, new Place([PlaceLocation.fromDMS("38°0'N, 79°0'W")]))
