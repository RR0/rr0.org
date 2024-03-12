import { Place } from "place/Place"
import { UsaSates } from "../UsaSates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const westVirginia = usaRegion(UsaSates.wv, new Place([PlaceLocation.fromDMS("38°51′27″N,82°7′43″W")]))
