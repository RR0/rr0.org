import { Rr0Data } from "../Rr0Data"
import { PlaceLocation } from "./PlaceLocation"

export type Elevation = {
  elevation: number,
  data?: any
}

export class Place implements Rr0Data {

  constructor(
    readonly locations: PlaceLocation[],
    readonly elevation?: Elevation,
    readonly dirName?: string,
    /**
     * Remote service specific data.
     */
    readonly data?: any
  ) {
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
