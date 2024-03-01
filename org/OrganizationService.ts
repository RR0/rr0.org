import { Place } from "../place/Place"
import fs from "fs"
import { Organization } from "./Organization"

export class OrganizationService {

  protected readonly cache = new Map<string, Place>()

  constructor(readonly rootDir: string) {
  }

  async read(fileName: string): Promise<Organization<any>> {
    const fileBuffer = fs.readFileSync(this.rootDir + fileName)
    const place = JSON.parse(fileBuffer.toString())
    this.cache.set(place.title, place)
    return place
  }
}
