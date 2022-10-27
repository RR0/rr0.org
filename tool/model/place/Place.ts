import {State} from "./Country"

export type Location = {
  lat: number
  lng: number
}

export class Place {

  constructor(readonly title: string, readonly dirName?: string, readonly location?: Location, readonly state?: State) {
  }
}

export const placeDirName = "place/systeme/solaire/planete/terre/"
