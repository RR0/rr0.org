import fs from "fs"
import { Organization } from "./Organization"
import { StringUtil } from "../util/string/StringUtil"
import { RR0SsgContext } from "../RR0SsgContext"

export class OrganizationService<O extends Organization = Organization, P extends Organization = undefined> {

  constructor(readonly orgs: O[] = [], readonly rootDir: string = "org") {
  }

  static normalizeName(name: string): string {
    return StringUtil.removeAccents(name.toLowerCase().replaceAll(" ", "-"))
  }

  get(code: string, parent: P = undefined): O | undefined {
    return this.orgs.find(org => {
      const foundParent = !parent || org.parent === parent
      const foundOrg = org.code === code ? org : undefined
      const found = foundParent && foundOrg
      return found ? org : undefined
    })
  }

  find(context: RR0SsgContext, nameToFind: string, parent: P): Organization | undefined {
    return this.orgs.find(org => {
      const orgMessages = org.messages(context)
      const hasMessages = Boolean(orgMessages)
      let found: boolean
      if (hasMessages) {
        const orgNameToFind = this.nameToFind(context, org, nameToFind)
        const hasParent = Boolean(parent?.code)
        const parentCheck = !hasParent || parent.code === org.parent.code
        if (parentCheck) {
          let foundName: boolean
          for (let i = 0; !foundName && i < orgMessages.titles.length; i++) {
            const depName = OrganizationService.normalizeName(
              orgMessages.toTitleFromName(context, org, orgMessages.titles[i], {parent: false}))
            const depCityName = OrganizationService.normalizeName(depName)
            foundName = depCityName === orgNameToFind
          }
          found = foundName
        } else {
          found = false
        }
      } else {
        found = false
      }
      return found ? org : undefined
    })
  }

  async read(fileName: string): Promise<Organization<any>> {
    const fileBuffer = fs.readFileSync(this.rootDir + fileName)
    const place = JSON.parse(fileBuffer.toString())
    this.orgs.push(place)
    return place
  }

  protected nameToFind(context: RR0SsgContext, org: O, nameToFind: string) {
    return OrganizationService.normalizeName(nameToFind)
  }
}
