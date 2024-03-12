import { Place } from "place/Place"
import { UsaRegionCode } from "../UsaRegionCode"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const westVirginia = usaRegion(UsaRegionCode.wv, new Place([PlaceLocation.fromDMS("38°51′27″N,82°7′43″W")]))
