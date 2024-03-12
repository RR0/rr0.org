import { Place } from "place/Place"
import { UsaSates } from "../UsaSates"
import { PlaceLocation } from "../../../../place/PlaceLocation"
import { usaRegion } from "../../Usa"

export const virginia = usaRegion(UsaSates.va, new Place([PlaceLocation.fromDMS("38°0'N, 79°0'W")]))
