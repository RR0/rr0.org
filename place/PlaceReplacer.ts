import {PlaceService} from "./PlaceService"
import {OrganizationService} from "../org/OrganizationService"
import {HtmlSsgContext} from "ssg-api"

export class PlaceReplacer {

  constructor(protected placeService: PlaceService, protected orgService: OrganizationService) {
  }

  async replacement(context: HtmlSsgContext, original: HTMLElement): Promise<HTMLElement> {
    let replacement: HTMLElement
    const address = original.textContent || ""
    /*const place = await this.placeService.get(address)
    if (place) {
      const dirName = place.dirName
      if (dirName) {
        const org = await this.orgService.read(dirName)
        const orgTitle = org.title(context)
        const titleAttr = address.indexOf(orgTitle) < 0 ? ` title="${orgTitle}"` : ""
        const outputDoc = context.outputFile.dom.window.document
        const anchor = replacement = outputDoc.createElement("a") as HTMLAnchorElement
        replacement.title = titleAttr
        anchor.href = UrlUtil.absolute(dirName)
      } else {
        console.warn("Place", place, "has no dirName")*/
    const outputDoc = context.outputFile.dom.window.document
    replacement = outputDoc.createElement("span")
    /*  }
      const location = place.location
      if (location) {*/
    replacement.setAttribute("onclick", `showMap('${address}')`)
    /*    }
      } else {
        const outputDoc = context.outputFile.dom.window.document
        replacement = outputDoc.createElement("span")
      }*/
    replacement.innerHTML = address
    replacement.className = "plac"
    replacement.translate = false
    context.debug("\tReplacing place", original.innerHTML, "with", replacement)
    return replacement
  }
}
