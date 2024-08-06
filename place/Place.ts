import { RR0Data } from "../RR0Data"
import { PlaceLocation } from "./PlaceLocation"

export type Elevation = {
  elevation: number,
  data?: any
}

export class Place extends RR0Data {

  constructor(readonly locations: PlaceLocation[], readonly elevation?: Elevation, dirName?: string,
              /**
               * Remote service specific data.
               */
              data?: any
  ) {
    super(dirName, dirName, undefined, [], "place")
  }

  /**
   *
   * @param {float} lat Latitude in decimal degrees. North is positive.
   * @param {float} lng Longitude in decimal degrees. East is positive.
   */
  static fromLocation(lat: number, lng: number) {
    return new Place([new PlaceLocation(lat, lng)])
  }

  static fromDMS(latLng: string) {
    return new Place([PlaceLocation.fromDMS(latLng)])
  }
}

export const placeDirName = "place/systeme/solaire/planete/terre/"
