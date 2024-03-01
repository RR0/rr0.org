import { Place } from "place/Place"
import { UsaRegionCode } from "../UsaRegionCode"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const indiana = usaRegion(UsaRegionCode.in, new Place([PlaceLocation.fromDMS("39°09′44″N,86°31′45″O")]))
