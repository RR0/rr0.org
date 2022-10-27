import {Client, PlaceType2, Status} from "@googlemaps/google-maps-services-js"

import {Location, Place, placeDirName} from "./Place"
import {CountryCode} from "./CountryCode"
import {Country, State} from "./Country"
import {StringUtil} from "../../util/string/StringUtil"
import {writeFile} from "../../util/file/FileUtil"
import fs from "fs"

export class PlaceService {

  protected readonly cache = new Map<string, Place>()
  private readonly client: Client

  constructor() {
    this.client = new Client({})
  }

  async read(dirName: string): Promise<Place> {
    const fileBuffer = fs.readFileSync(dirName + "/index.json")
    const place = JSON.parse(fileBuffer.toString())
    this.cache.set(place.title, place)
    return place
  }

  async get(address: string): Promise<Place> {
    let place = this.cache.get(address)
    if (!place) {
      place = await this.create(address)
      await this.save(place)
      this.cache.set(place.title, place)
    }
    return await this.create(address)
  }

  private async create(address: string): Promise<Place> {
    const key = process.env.GOOGLE_MAPS_API_KEY || ""
    const response = await this.client.geocode({params: {address, key}})
    const data = response.data
    let dirName: string | undefined
    let state: State | undefined
    let location: Location | undefined
    switch (data.status) {
      case Status.OK:
        const result = data.results[0]
        const gCountry = result.address_components.find(c => c.types.includes(PlaceType2.country))
        const countryCode = gCountry ? gCountry.short_name.toLowerCase() as CountryCode : undefined
        if (countryCode) {
          const country = Country.instances.get(countryCode)
          if (country) {
            const gState = result.address_components.find(c => c.types.includes(PlaceType2.administrative_area_level_1))
            state = gState ? country.states.get(gState.short_name.toLowerCase()) : undefined
            if (state) {
              dirName = state.dirName + StringUtil.textToCamel(address)
            } else {
              dirName = country.dirName + StringUtil.textToCamel(address)
            }
          } else {
            dirName = placeDirName + StringUtil.textToCamel(address)
          }
        } else {
          dirName = placeDirName + StringUtil.textToCamel(address)
        }
        location = result.geometry.location
        break
      case Status.NOT_FOUND:
      case Status.ZERO_RESULTS:
        break
      default:
        throw Error(data.error_message)
    }
    return new Place(address, dirName, location, state)
  }

  private async save(place: Place) {
    const fileName = place.dirName + "/index.json"
    const toSave: any = {...place}
    delete toSave.dirName
    await writeFile(fileName, JSON.stringify(toSave, null, 2), "utf-8")
  }
}
