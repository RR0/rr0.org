import { DMS } from "./PlaceLocation"

export interface PlaceMessages {
  dmsLat: (dms: DMS) => string
  dmsLng: (dms: DMS) => string
}
