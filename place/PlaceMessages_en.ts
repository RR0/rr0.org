import { DMS } from "./PlaceLocation"
import { PlaceMessages } from "./PlaceMessages"

export const placeMessages_en: PlaceMessages = {
  dmsLat: (dms: DMS) => `${dms.deg}°${dms.min}′${dms.sec}″${dms.positive ? "N" : "S"}`,
  dmsLng: (dms: DMS) => `${dms.deg}°${dms.min}′${dms.sec}″${dms.positive ? "E" : "W"}`
}
