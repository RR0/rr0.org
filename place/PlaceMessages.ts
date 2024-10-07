import { DMS } from "./PlaceLocation.js"

export interface PlaceMessages {
  dmsLat: (dms: DMS) => string
  dmsLng: (dms: DMS) => string
}
