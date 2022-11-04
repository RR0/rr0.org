import {Rr0Data} from "../Rr0Data"

export type PlaceLocation = {
  lat: number
  lng: number
}

export type Elevation = {
  elevation: number,
  data?: any
}

export class Place implements Rr0Data {

  constructor(
    readonly location: PlaceLocation,
    readonly elevation?: Elevation,
    readonly dirName?: string,
    /**
     * Remote service specific data.
     */
    readonly data?: any
  ) {
  }
}

export const placeDirName = "place/systeme/solaire/planete/terre/"
