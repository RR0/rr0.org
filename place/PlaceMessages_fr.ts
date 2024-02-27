import { DMS } from "./PlaceLocation"
import { PlaceMessages } from "./PlaceMessages"

export const placeMessages_fr: PlaceMessages = {
  dmsLat: (dms: DMS) => `${dms.deg}°${dms.min}′${dms.sec}″${dms.positive ? "N" : "S"}`,
  dmsLng: (dms: DMS) => `${dms.deg}°${dms.min}′${dms.sec}″${dms.positive ? "E" : "O"}`
}
