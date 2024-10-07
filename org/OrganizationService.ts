import fs from "fs"
import { Organization } from "./Organization.js"
import { StringUtil } from "../util/string/StringUtil.js"
import { RR0SsgContext } from "../RR0SsgContext.js"
import assert from "assert"

export class OrganizationService<O extends Organization = Organization, P extends Organization = undefined> {

  constructor(readonly orgs: O[] = [], readonly rootDir: string, readonly parentService: OrganizationService) {
  }

  static normalizeName(name: string): string {
    return StringUtil.removeAccents(name.toLowerCase().replaceAll(" ", "-"))
  }

  get(code: string, parent: P = undefined): O | undefined {
    return this.orgs.find(org => {
      const foundParent = !parent || org.parent === parent
      const foundOrg = org.id === code ? org : undefined
      const found = foundParent && foundOrg
      return found ? org : undefined
    })
  }

  find(context: RR0SsgContext, nameToFind: string, parent: P): Organization | undefined {
    let foundOrg = this.orgs.find(org => {
      const orgMessages = org.getMessages(context)
      assert.ok(orgMessages, `Organization with code "${org.id}" has no messages`)
      let found: boolean
      const orgNameToFind = this.nameToFind(context, org, nameToFind)
      const hasParent = Boolean(parent?.id)
      const parentCheck = !hasParent || parent.id === org.parent.id
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
      return found ? org : undefined
    })
    if (this.parentService && !foundOrg) {
      foundOrg = this.parentService.find(context, nameToFind, undefined) as any
    }
    return foundOrg
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
