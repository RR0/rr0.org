import { Place } from "../place/Place"
import fs from "fs"
import { Organization } from "./Organization"
import { StringUtil } from "../util/string/StringUtil"

export class OrganizationService {

  protected readonly cache = new Map<string, Place>()

  constructor(readonly rootDir: string) {
  }

  static normalizeName(name: string): string {
    return StringUtil.removeAccents(name.toLowerCase().replaceAll(" ", "-"))
  }

  async read(fileName: string): Promise<Organization<any>> {
    const fileBuffer = fs.readFileSync(this.rootDir + fileName)
    const place = JSON.parse(fileBuffer.toString())
    this.cache.set(place.title, place)
    return place
  }
}
