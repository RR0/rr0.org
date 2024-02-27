import { Client, Status } from "@googlemaps/google-maps-services-js"

import { Elevation } from "./Place"
import { PlaceService } from "./PlaceService"
import { PlaceLocation } from "./PlaceLocation"

export class GooglePlaceService extends PlaceService {

  private readonly client: Client

  constructor(rootDir: string, protected apiKey: string) {
    super(rootDir)
    this.client = new Client({})
  }

  protected async getElevation(location: PlaceLocation): Promise<Elevation | undefined> {
    console.debug("Looking for elevation of", location)
    const elevationResponse = await this.client.elevation({params: {locations: [location], key: this.apiKey}})
    const data = elevationResponse.data
    switch (data.status) {
      case Status.OK:
        const results = data.results
        switch (results.length) {
          case 0:
            throw Error(`No results when looking for elevation of ${JSON.stringify(location)}`)
          case 1:
            const result = results[0]
            return {elevation: result.elevation, data: result}
          default:
            throw Error(`More than 1 result when looking for elevation of ${JSON.stringify(location)}`)
        }
      case Status.NOT_FOUND:
      case Status.ZERO_RESULTS:
        break
      default:
        throw Error(`Unexpected status ${data.status} when looking for elevation of ${JSON.stringify(
          location)}: ${data.error_message}`)
    }
  }

  protected async geocode(address: string): Promise<{ location: PlaceLocation, data: any } | undefined> {
    console.debug("Geocoding", address)
    const response = await this.client.geocode({params: {address, key: this.apiKey}})
    const data = response.data
    switch (data.status) {
      case Status.OK:
        const results = data.results
        switch (results.length) {
          case 0:
            throw Error(`No results when geocoding "${address}"`)
          case 1:
            const singleResult = results[0]
            const locationData = singleResult.geometry.location
            const location = new PlaceLocation(locationData.lat, locationData.lng)
            return {location, data: singleResult}
          default:
            throw Error(`More than 1 result when geocoding "${address}": ${JSON.stringify(results)}`)
        }
      case Status.NOT_FOUND:
      case Status.ZERO_RESULTS:
        break
      default:
        throw Error(`Unexpected status ${data.status} when geocoding "${address}": ${data.error_message}`)
    }
  }
}
