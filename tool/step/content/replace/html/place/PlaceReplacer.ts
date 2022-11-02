import {UrlUtil} from "../../../../../util/url/UrlUtil"
import {HtmlSsgContext} from "../../../../../HtmlSsgContext"
import {PlaceService} from "../../../../../model/place/PlaceService"
import {OrganizationService} from "../../../../../model/org/OrganizationService"

export class PlaceReplacer {

  constructor(protected placeService: PlaceService, protected orgService: OrganizationService) {
  }

  async replacement(context: HtmlSsgContext, original: HTMLElement): Promise<HTMLElement> {
    let replacement: HTMLElement
    const placeStr = original.innerHTML || ""
    const place = await this.placeService.get(placeStr)
    if (place) {
      const dirName = place.dirName
      if (dirName) {
        const org = await this.orgService.read(dirName)
        const orgTitle = org.title(context)
        const titleAttr = placeStr.indexOf(orgTitle) < 0 ? ` title="${orgTitle}"` : ""
        const outputDoc = context.outputFile.dom.window.document
        const anchor = replacement = outputDoc.createElement("a") as HTMLAnchorElement
        replacement.title = titleAttr
        anchor.href = UrlUtil.absolute(dirName)
        const location = place.location
        if (location) {
          replacement.setAttribute("onclick", `showMap(${location.lat},${location.lng})`)
        }
      } else {
        console.warn("Place", place, "has no dirName")
        const outputDoc = context.outputFile.dom.window.document
        replacement = outputDoc.createElement("span")
      }
    } else {
      const outputDoc = context.outputFile.dom.window.document
      replacement = outputDoc.createElement("span")
    }
    replacement.innerHTML = placeStr
    replacement.translate = false
    context.debug("\tReplacing place", original.innerHTML, "with", replacement)
    return replacement
  }
}
