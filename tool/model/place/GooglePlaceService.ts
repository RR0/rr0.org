import {Client, Status} from "@googlemaps/google-maps-services-js"

import {Elevation, PlaceLocation} from "./Place"
import {PlaceService} from "./PlaceService"

export class GooglePlaceService extends PlaceService {

  private readonly client: Client

  constructor(rootDir: string, protected apiKey: string) {
    super(rootDir)
    this.client = new Client({})
  }

  protected async elevation(location: PlaceLocation): Promise<Elevation> {
    const elevationResponse = await this.client.elevation({params: {locations: [location], key: this.apiKey}})
    const data = elevationResponse.data
    const result = data.results[0]
    return {elevation: result.elevation}
  }

  protected async geocode(address: string): Promise<{ location: PlaceLocation, data: any } | undefined> {
    const response = await this.client.geocode({params: {address, key: this.apiKey}})
    const data = response.data
    switch (data.status) {
      case Status.OK:
        const results = data.results
        switch (results.length) {
          case 0:
            throw Error(`No results when geocoding ${address}`)
          case 1:
            const result = results[0]
            const location = result.geometry.location
            return {location, data: result}
          default:
            throw Error(`Too many results when geocoding "${address}"`)
        }
      case Status.NOT_FOUND:
      case Status.ZERO_RESULTS:
        break
      default:
        throw Error(data.error_message)
    }
  }
}
