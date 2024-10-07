import { DMS } from "./PlaceLocation.js"
import { PlaceMessages } from "./PlaceMessages.js"

export const placeMessages_fr: PlaceMessages = {
  dmsLat: (dms: DMS) => `${dms.deg}°${dms.min}′${dms.sec}″${dms.positive ? "N" : "S"}`,
  dmsLng: (dms: DMS) => `${dms.deg}°${dms.min}′${dms.sec}″${dms.positive ? "E" : "O"}`
}
