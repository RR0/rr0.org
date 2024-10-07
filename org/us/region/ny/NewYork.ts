import { usaRegion } from "../../Usa.js"
import { UsaStates } from "../UsaStates.js"
import { Place } from "../../../../place/Place.js"

export const newYork = usaRegion(UsaStates.ny, Place.fromDMS("43°0'N,75°0'W"))
